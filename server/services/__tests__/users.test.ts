import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { User } from "../../interfaces";
import { UserService } from "../users";
import { prisma } from "../../utils";

jest.mock("@prisma/client");
describe("/users", () => {
  const exampleCreateUser = {
    user_name: "John",
    email: "John@example.com",
    user_password: "password1!",
    user_level_id: 1,
  };
  const exampleIncorrectCreateUser = {
    user_name: "J",
    email: "Joh",
    user_password: "p!",
    user_level_id: 0,
  };
  const exampleGetUsersFromDb = [
    {
      id: 1,
      user_name: "John Smith",
      email: "JohnSmith@example.com",
    },
    {
      id: 2,
      user_name: "Jane Doe",
      email: "JaneDoe@example.com",
    },
  ];
  const exampleGetUsers = [
    {
      userId: 1,
      userName: "John Smith",
      emailAddress: "JohnSmith@example.com",
    },
    {
      userId: 2,
      userName: "Jane Doe",
      emailAddress: "JaneDoe@example.com",
    },
  ];

  const exampleCreatedUsers = {
    userId: undefined,
    userName: "John",
    emailAddress: "John@example.com",
    userLevelId: 1,
  };

  const exampleUpdateUsers: User = {
    id: 1,
    user_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_password: "password2!",
    user_level_id: 1,
  };
  const exampleUpdateUsersIncorrectPassword: User = {
    id: 1,
    user_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_password: "pass",
    user_level_id: 1,
  };

  describe("POST /users", () => {
    it("should create a new user when correct body is passed", async () => {
      prismaAsAny.users = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateUser),
      };
      const result = await UserService.createUser(exampleCreateUser);
      expect(prisma.users.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleCreatedUsers);
    });

    it("should throw an error when trying to create a new user when but incorrect body is passed", async () => {
      prismaAsAny.users = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("Cannot create user");
        }),
      };
      await expect(
        UserService.createUser(exampleIncorrectCreateUser)
      ).rejects.toThrow("Cannot create user");
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetUsersFromDb),
      };
      const result = await UserService.getAllUsers();
      expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetUsers);
    });

    it("should throw an error and return 500 if error getting all users from database", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(UserService.getAllUsers()).rejects.toThrow("Error");
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValueOnce(exampleGetUsersFromDb[0]),
      };
      const result = await UserService.getUserById(1);
      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetUsers[0]);
    });

    it("should return 500 status code and error if database is unable to get user by id", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(UserService.getUserById(NaN)).rejects.toThrow(
        "Could not find user by id"
      );
    });
  });

  describe("PUT /users/:id", () => {
    it("should get update user by id", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };

      const result = await UserService.updateUserDetails(exampleUpdateUsers);
      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateUsers);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        UserService.updateUserDetails(exampleUpdateUsersIncorrectPassword)
      ).rejects.toThrow("Error");
    });
  });

  describe("PUT /users/:id", () => {
    it("should get update user password by id", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };
      const result = await UserService.updateUserPassword({
        id: 1,
        user_password: "password2!",
      });
      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual("Successfully updated password");
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        UserService.updateUserPassword({ id: NaN, user_password: "" })
      ).rejects.toThrow("Error");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete user by id", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };

      const result = await UserService.deleteUserById(1);
      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateUsers);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      await expect(UserService.deleteUserById(NaN)).rejects.toThrow("Error");
    });
  });
});
