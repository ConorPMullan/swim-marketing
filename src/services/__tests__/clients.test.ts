import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { Client } from "../../interfaces";
import { ClientService } from "../clients";
import { prisma } from "../../utils";

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
    user_id: NaN,
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
    id: 1,
    client_name: "John Smyth",
    email: "JohnSmyth@example.com",
    user_id: 1,
  };
  const exampleUpdateClientsIncorrectEmail = {
    client_id: 1,
    client_name: "John Smyth",
    email: 0,
    user_id: NaN,
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
      prismaAsAny.client = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateClient),
      };
      prismaAsAny.user_client = {
        create: jest.fn().mockResolvedValueOnce({ userId: 1, clientId: 1 }),
      };
      const result = await ClientService.createClient(exampleCreateClient);
      expect(prisma.client.create).toHaveBeenCalledTimes(1);
      expect(prisma.user_client.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleClientResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.client = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        ClientService.createClient(exampleIncorrectCreateClient)
      ).rejects.toThrow("Cannot create client");
    });
  });

  describe("GET /clients", () => {
    it("should get all clients", async () => {
      prismaAsAny.client = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetClientsFromDb),
      };
      const result = await ClientService.getAllClients();
      expect(prisma.client.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetClients);
    });

    it("should throw an error and return 500 if error getting all clients from database", async () => {
      prismaAsAny.client = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(ClientService.getAllClients()).rejects.toThrow(
        "Cannot get clients"
      );
    });
  });

  describe("GET /clients/:id", () => {
    it("should get client by id", async () => {
      prismaAsAny.client = {
        findUnique: jest.fn().mockResolvedValueOnce(exampleGetClientsFromDb[0]),
      };
      const result = await ClientService.getClientById(1);
      expect(prisma.client.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetClients[0]);
    });

    it("should return 500 status code and error if database is unable to get client by id", async () => {
      prismaAsAny.client = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(ClientService.getClientById(NaN)).rejects.toThrow(
        "Cannot get client"
      );
    });
  });

  describe("GET /clients/users/:id", () => {
    it("should get client by user id", async () => {
      prismaAsAny.client = {
        findUnique: jest.fn().mockResolvedValueOnce(exampleGetClientsFromDb),
      };
      prismaAsAny.user_client = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetClientsFromDb),
      };
      const result = await ClientService.getClientsByUserId(1);
      expect(prisma.user_client.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetClients);
    });

    it("should return 500 status code and error if database is unable to get client by id", async () => {
      prismaAsAny.user_client = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(ClientService.getClientsByUserId(NaN)).rejects.toThrow(
        "Cannot get client by user id"
      );
    });
  });

  describe("PUT /clients/:id", () => {
    it("should get update client by id", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockResolvedValueOnce(exampleUpdateClients),
      };
      const result = await ClientService.updateClientDetails(
        exampleUpdateClients
      );
      expect(prisma.client.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateClients);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        ClientService.updateClientDetails(exampleUpdateClients)
      ).rejects.toThrow("Cannot update client");
    });
  });

  describe("DELETE /clients/", () => {
    it("should delete client by id", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockResolvedValueOnce({ clientId: 1 }),
      };
      const result = await ClientService.deleteClientById(1);
      expect(prisma.client.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ clientId: 1 });
    });
    it("should throw an 404 if invalid id to delete", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(ClientService.deleteClientById(1)).rejects.toThrow(
        "Cannot delete client"
      );
    });
  });
});
