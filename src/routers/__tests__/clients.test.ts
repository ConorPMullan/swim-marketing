import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { Client } from "../../interfaces";

const req = request(app);
jest.mock("@prisma/client");
describe("/clients", () => {
  const exampleCreateClient = {
    client_name: "John",
    email: "John@example.com",
    user_id: 1,
  };
  const exampleIncorrectCreateClient = {
    client_name: "J",
    email: "Joh",
    client_password: "p!",
  };
  const exampleGetClientsFromDb = [
    {
      id: 1,
      client_name: "John Smith",
      email: "JohnSmith@example.com",
    },
    {
      id: 2,
      client_name: "Jane Doe",
      email: "JaneDoe@example.com",
    },
  ];
  const exampleGetClients = [
    {
      clientId: 1,
      clientName: "John Smith",
      emailAddress: "JohnSmith@example.com",
    },
    {
      clientId: 2,
      clientName: "Jane Doe",
      emailAddress: "JaneDoe@example.com",
    },
  ];

  const exampleUpdateClients = {
    client_id: 1,
    client_name: "John Smyth",
    email: "JohnSmyth@example.com",
  };
  const exampleUpdateClientsIncorrectEmail = {
    client_id: 1,
    client_name: "John Smyth",
    email: 0,
  };
  const exampleUserClient = {
    id: 1,
    user_id: 1,
    client_id: 1,
  };
  const exampleClientDelete = {
    clientId: 1,
  };
  const exampleClientResponse = {
    client_name: "John",
    email: "John@example.com",
  };

  describe("POST /clients", () => {
    it("should create a new client when correct body is passed", async () => {
      jest.mock("../../controllers/users");
      jest.mock("../../controllers/clients");
      prismaAsAny.client = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateClient),
      };
      prismaAsAny.user_client = {
        create: jest.fn().mockResolvedValueOnce(exampleUserClient),
      };
      const res = await req.post("/api/clients").send(exampleCreateClient);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(exampleClientResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.client = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.post("/api/clients/").send(exampleCreateClient);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create client.");
    });

    it("should throw an error when trying to create a new client when but incorrect body is passed", async () => {
      prismaAsAny.client = {
        create: jest.fn().mockResolvedValueOnce(exampleIncorrectCreateClient),
      };
      const res = await req
        .post("/api/clients/")
        .send(exampleIncorrectCreateClient);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /clients", () => {
    it("should get all clients", async () => {
      prismaAsAny.client = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetClientsFromDb),
      };
      const res = await req.get("/api/clients/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetClients);
    });

    it("should throw an error and return 500 if error getting all clients from database", async () => {
      prismaAsAny.client = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/clients/");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no clients,", async () => {
      prismaAsAny.client = {
        findMany: jest.fn().mockReturnValueOnce([]),
      };
      const res = await req.get("/api/clients/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /clients/:id", () => {
    it("should get client by id", async () => {
      prismaAsAny.client = {
        findUnique: jest.fn().mockReturnValueOnce(exampleGetClientsFromDb[0]),
      };
      const res = await req.get("/api/clients/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetClients[0]);
    });

    it("should return 500 status code and error if database is unable to get client by id", async () => {
      prismaAsAny.client = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/clients/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot find client id");
    });

    it("should return error if id does not exist", async () => {
      const res = await req.get("/api/clients/string");
      expect(res.status).toBe(400);
      expect(res.body).toBe("Requires valid clientId");
    });
  });

  describe("PUT /clients/:id", () => {
    it("should get update client by id", async () => {
      jest.mock("../../controllers/clients");
      prismaAsAny.client = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateClients),
      };
      const res = await req.put("/api/clients").send(exampleUpdateClients);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateClients);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.put("/api/clients").send(exampleUpdateClients);
      expect(res.status).toBe(500);
    });

    it("should throw an error if an incorrect email is passed to update client by id", async () => {
      const res = await req
        .put("/api/clients")
        .send(exampleUpdateClientsIncorrectEmail);
      expect(res.status).toBe(404);
    });

    it("should throw an error if an incorrect body is passed to update client by id", async () => {
      const res = await req.put("/api/clients").send({});
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /clients/", () => {
    it("should delete client by id", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockReturnValueOnce(exampleClientDelete),
      };
      const res = await req.delete("/api/clients/").send(exampleClientDelete);
      expect(res.status).toBe(200);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      jest.mock("../../controllers/clients");
      prismaAsAny.client = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/clients/string");
      expect(res.status).toBe(404);
    });
    it("should throw an error if no id to delete", async () => {
      jest.mock("../../controllers/clients");

      const res = await req.delete("/api/clients/").send({});

      expect(res.status).toBe(400);
    });
  });
});
