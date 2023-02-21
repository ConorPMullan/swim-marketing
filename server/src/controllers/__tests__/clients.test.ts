import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { when } from "jest-when";
import { ClientService } from "../../services/clients";
import { StatusCodes } from "http-status-codes";
import { ClientController } from "../clients";

jest.mock("../../services/clients");

jest.mock("@prisma/client");
describe("ClientController", () => {
  describe("getClients", () => {
    it("returns status code `200` and an array of clients", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/",
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = [
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
      when(ClientService.getAllClients)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await ClientController.getAllClients(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()[0]).toEqual(returnValue[0]);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/",
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.getAllClients)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error("Error getting all clients");
        });

      await ClientController.getAllClients(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getClientById", () => {
    it("returns status code `200` and an array of clients", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        clientId: 1,
        clientName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        companyName: "Test Company",
      };
      when(ClientService.getClientById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await ClientController.getClientById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.getClientById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ClientController.getClientById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getClientByUserId", () => {
    it("returns status code `200` and an array of clients", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        clientId: 1,
        clientName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        companyName: "Test Company",
      };
      when(ClientService.getClientsByUserId)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await ClientController.getClientsByUserId(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual([returnValue]);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/users/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        clientId: 1,
        clientName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        companyName: "Test Company",
      };
      when(ClientService.getClientsByUserId)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await ClientController.getClientsByUserId(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/clients/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.getClientsByUserId)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ClientController.getClientsByUserId(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("createClient", () => {
    const createBody = {
      client_name: "John Smith",
      email: "JohnSmith@example.com",
      user_id: 1,
      company_name: "Test Company",
    };
    const invalidCreateBody = {
      client_name: "",
      email: "",
      user_id: 0,
      company_name: "",
    };
    it("returns status code `200` if client is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/clients",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        client_name: "John Smith",
        email: "JohnSmith@example.com",
        company_name: "Test Company",
      };
      when(ClientService.createClient)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await ClientController.createClient(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/clients",
        body: invalidCreateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.createClient)
        .calledWith(invalidCreateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ClientController.createClient(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateClientDetails", () => {
    const updateBody = {
      id: 1,
      client_name: "John Smith",
      email: "JohnSmith@example.com",
      company_name: "Test Company",
    };
    const invalidUpdateBody = {
      id: 1,
      client_name: "",
      email: "",
      company_name: "",
    };
    it("returns status code `200` if client is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/clients",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        clientId: 1,
        clientName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        companyName: "Test Company",
      };
      when(ClientService.updateClientDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await ClientController.updateClientDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/clients",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.updateClientDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ClientController.updateClientDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteClientById", () => {
    it("returns status code `200` if client is successfully delete", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/clients",
        body: {
          clientId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.deleteClientById).calledWith(request.body)
        .mockResolvedValue;

      await ClientController.deleteClientById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an invalid id is passed", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/clients/1",
        params: {
          id: "string",
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(ClientService.deleteClientById)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ClientController.deleteClientById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/clients",
        body: {
          clientId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(await ClientService.deleteClientById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await ClientController.deleteClientById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
});
