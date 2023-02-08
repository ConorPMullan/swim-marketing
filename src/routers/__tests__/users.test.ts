import request from "supertest";
import { app } from "../../../app";
import { User } from "../../interfaces";

const req = request(app);

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
      emailAddress: "john.smith@gmail.com",
      userId: 1,
      userName: "John Smith",
    },
    {
      emailAddress: "jane.smith@gmail.com",
      userId: 2,
      userName: "Jane Smith",
    },
    {
      emailAddress: "bob.johnson@gmail.com",
      userId: 3,
      userName: "Bob Johnson",
    },
    {
      emailAddress: "alice.williams@gmail.com",
      userId: 4,
      userName: "Alice Williams",
    },
    {
      emailAddress: "chris.jones@gmail.com",
      userId: 5,
      userName: "Chris Jones",
    },
  ];
  const exampleGetUsers = [
    {
      userId: 1,
      userName: "John Smith",
      emailAddress: "john.smith@gmail.com",
    },
    {
      userId: 2,
      userName: "Jane Doe",
      emailAddress: "JaneDoe@example.com",
    },
  ];

  const exampleCreatedUsers = {
    userName: "John",
    emailAddress: "John@example.com",
  };

  const exampleUpdateUsers: User = {
    id: 1,
    user_name: "John Smyth",
    email: "johnsmyth@example.com",
    user_password: "password123",
  };

  const exampleDeletedUsers: User = {
    id: 1,
    user_name: "DELETEDUSER",
    email: "DELETED",
    user_password: "DELETEDUSERPASS",
  };
  const exampleUpdateUsersIncorrectPassword: User = {
    id: 1,
    user_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_password: "pass",
  };

  describe("POST /users", () => {
    it("should create a new user when correct body is passed", async () => {
      const res = await req.post("/api/users/").send(exampleCreateUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleCreatedUsers);
    });

    it("should throw a 500 when error in database", async () => {
      const res = await req.post("/api/users/").send(exampleCreateUser);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create user.");
    });

    it("should throw an error when trying to create a new user when but incorrect body is passed", async () => {
      const res = await req
        .post("/api/users/")
        .send(exampleIncorrectCreateUser);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      const res = await req.get("/api/users/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetUsersFromDb);
    });

    it("should throw an error and return 500 if error getting all users from database", async () => {
      const res = await req.get("/api/users/");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no users,", async () => {
      const res = await req.get("/api/users/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id", async () => {
      const res = await req.get("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetUsers[0]);
    });

    it("should return 500 status code and error if database is unable to get user by id", async () => {
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
      const res = await req.put("/api/users/1").send(exampleUpdateUsers);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateUsers);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
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
      const res = await req.delete("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleDeletedUsers);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      const res = await req.delete("/api/users/string");
      expect(res.status).toBe(400);
    });
    it("should throw an error if no id to delete", async () => {
      const res = await req.delete("/api/users/60");
      expect(res.status).toBe(500);
    });
  });
});
