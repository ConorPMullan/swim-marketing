import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { User } from "../../interfaces";

const req = request(app);
jest.mock("@prisma/client");
describe("/users", () => {
  const exampleCreateUser = {
    user_name: "John",
    email: "John@example.com",
    user_password: "password1!",
  };
  const exampleIncorrectCreateUser = {
    user_name: "J",
    email: "Joh",
    user_password: "p!",
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

  const exampleUpdateUsers: User = {
    id: 1,
    user_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_password: "password2!",
  };
  const exampleUpdateUsersIncorrectPassword: User = {
    id: 1,
    user_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_password: "pass",
  };

  describe("POST /users", () => {
    it("should create a new user when correct body is passed", async () => {
      prismaAsAny.users = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateUser),
      };
      const res = await req.post("/api/users/").send(exampleCreateUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual("John");
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.users = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.post("/api/users/").send(exampleCreateUser);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create user.");
    });

    it("should throw an error when trying to create a new user when but incorrect body is passed", async () => {
      prismaAsAny.users = {
        create: jest.fn().mockResolvedValueOnce(exampleIncorrectCreateUser),
      };
      const res = await req
        .post("/api/users/")
        .send(exampleIncorrectCreateUser);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetUsersFromDb),
      };
      const res = await req.get("/api/users/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetUsers);
    });

    it("should throw an error and return 500 if error getting all users from database", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/users/");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no users,", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce([]),
      };
      const res = await req.get("/api/users/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValueOnce(exampleGetUsersFromDb[0]),
      };
      const res = await req.get("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetUsers[0]);
    });

    it("should return 500 status code and error if database is unable to get user by id", async () => {
      prismaAsAny.users = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/users/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot find user id");
    });

    it("should return error if id does not exist", async () => {
      const res = await req.get("/api/users/string");
      expect(res.status).toBe(400);
      expect(res.body).toBe("Requires valid userId");
    });
  });

  describe("PUT /users/:id", () => {
    it("should get update user by id", async () => {
      jest.mock("../../controllers/users");
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };
      const res = await req.put("/api/users/1").send(exampleUpdateUsers);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateUsers);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.put("/api/users/1").send(exampleUpdateUsers);
      expect(res.status).toBe(500);
    });

    it("should throw an error if an incorrect password is passed to update user by id", async () => {
      const res = await req
        .put("/api/users/1")
        .send(exampleUpdateUsersIncorrectPassword);
      expect(res.status).toBe(404);
    });

    it("should throw an error if an incorrect body is passed to update user by id", async () => {
      const res = await req.put("/api/users/1").send({});
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete user by id", async () => {
      jest.mock("../../controllers/users");
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };
      const res = await req.delete("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateUsers);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      jest.mock("../../controllers/users");
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/users/string");
      expect(res.status).toBe(400);
    });
    it("should throw an error if no id to delete", async () => {
      jest.mock("../../controllers/users");
      prismaAsAny.users = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/users/60");
      expect(res.status).toBe(500);
    });
  });
});
