import { prismaAsAny } from "../../test-utils/prisma";
import { ClientService } from "../clients";
import { prisma } from "../../utils";
import { IClientDetails } from "../../interfaces/clients";

jest.mock("@prisma/client");
describe("/clients", () => {
  const exampleCreateClient = {
    client_name: "John",
    email: "John@example.com",
    user_id: 1,
    company_name: "Test Company",
  };
  const exampleIncorrectCreateClient = {
    client_name: "J",
    email: "Joh",
    client_password: "p!",
    user_id: NaN,
    company_name: "Te",
  };
  const exampleGetClientsFromDb = [
    {
      id: 1,
      client_name: "John Smith",
      email: "JohnSmith@example.com",
      company_name: "Test Company",
    },
    {
      id: 2,
      client_name: "Jane Doe",
      email: "JaneDoe@example.com",
      company_name: "Test Company Two",
    },
  ];
  const exampleGetClients = [
    {
      clientId: 1,
      clientName: "John Smith",
      emailAddress: "JohnSmith@example.com",
      companyName: "Test Company",
    },
    {
      clientId: 2,
      clientName: "Jane Doe",
      emailAddress: "JaneDoe@example.com",
      companyName: "Test Company Two",
    },
  ];
  const exampleUpdateClientsFromDb = [
    {
      id: 1,
      client_name: "John Smith",
      email: "JohnSmith@example.com",
      company_name: "Test Company",
      user_client: {
        id: 1,
        client_id: 1,
        user_id: 1,
        users: {
          id: 1,
          user_name: "username",
          email: "testuser@mail.com",
          user_level_id: 1,
        },
      },
      companyName: "Test Company",
      campaigns: [],
      appointments: {
        id: 1,
        user_id: 1,
        client_id: 1,
        appointment_id: 1,
        appointment: [],
      },
    },
  ];

  const exampleUpdateClients: IClientDetails = {
    clientId: 1,
    clientName: "John Smyth",
    emailAddress: "JohnSmyth@example.com",
    users: {
      id: 1,
      client_id: 1,
      user_id: 1,
      users: {
        id: 1,
        user_name: "username",
        email: "testuser@mail.com",
        user_level_id: 1,
      },
    },
    companyName: "Test Company",
    campaigns: [],
    appointments: {
      id: 1,
      user_id: 1,
      client_id: 1,
      appointment_id: 1,
      appointment: [],
    },
  };

  const exampleUpdateClientsIncorrectEmail = {
    client_id: 1,
    client_name: "John Smyth",
    email: 0,
    user_id: NaN,
    company_name: "Test Company",
  };
  const exampleUserClient = {
    id: 1,
    user_id: 1,
    client_id: 1,
    company_name: "Test Company",
  };
  const exampleClientDelete = {
    clientId: 1,
  };
  const exampleClientResponse = {
    client_name: "John",
    email: "John@example.com",
    company_name: "Test Company",
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
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(exampleUpdateClientsFromDb[0]),
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
      prismaAsAny.user_client = {
        updateMany: jest.fn().mockResolvedValueOnce(exampleUpdateClients),
      };
      const result = await ClientService.updateClientDetails(
        exampleUpdateClients
      );
      expect(prisma.client.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateClients);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.client = {
        update: jest.fn().mockRejectedValueOnce(exampleUpdateClients),
        // (() => {
        //   throw new Error();
        // }),
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
