import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { when } from "jest-when";
import { UserService } from "../../services/users";
import { StatusCodes } from "http-status-codes";
import { UserController } from "../users";

jest.mock("../../services/users");

jest.mock("@prisma/client");
describe("UserController", () => {
  describe("getUsers", () => {
    it("returns status code `200` and an array of users", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/",
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = [
        {
          userId: 1,
          userName: "John Smith",
          emailAddress: "JohnSmith@example.com",
          userLevelId: 1,
        },
        {
          userId: 2,
          userName: "Jane Doe",
          emailAddress: "JaneDoe@example.com",
          userLevelId: 1,
        },
      ];
      when(UserService.getAllUsers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.getAllUsers(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()[0]).toEqual(returnValue[0]);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/",
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getAllUsers)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error("Error getting all users");
        });

      await UserController.getAllUsers(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getUserById", () => {
    it("returns status code `200` and an array of users", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        userId: 1,
        userName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        userLevelId: 1,
      };
      when(UserService.getUserById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.getUserById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.getUserById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting user by id");
        });

      await UserController.getUserById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("createUser", () => {
    const createBody = {
      user_name: "John Smith",
      email: "JohnSmith@example.com",
      user_password: "password12!",
      user_level_id: 1,
    };
    const invalidCreateBody = {
      user_name: "",
      email: "",
      user_password: "",
      user_level_id: 0,
    };
    it("returns status code `200` if user is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/users",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        userId: 1,
        userName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        userLevelId: 1,
      };
      when(UserService.createUser)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.createUser(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/users",
        body: invalidCreateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.createUser)
        .calledWith(invalidCreateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting user by id");
        });

      await UserController.createUser(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateUserDetails", () => {
    const updateBody = {
      id: 1,
      user_name: "John Smith",
      email: "JohnSmith@example.com",
      user_password: "password12!",
      user_level_id: 1,
    };
    const invalidUpdateBody = {
      id: 1,
      user_name: "",
      email: "",
      user_password: "",
      user_level_id: 0,
    };
    it("returns status code `200` if user is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/users",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        userId: 1,
        userName: "John Smith",
        emailAddress: "JohnSmith@example.com",
        userLevelId: 1,
      };
      when(UserService.updateUserDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.updateUserDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/users",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.updateUserDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting user by id");
        });

      await UserController.updateUserDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteUserById", () => {
    it("returns status code `200` if user is successfully delete", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        user_name: "John Smith",
        email: "JohnSmith@example.com",
        user_password: "password123!",
        user_level_id: 1,
      };
      when(UserService.deleteUserById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.getUserById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/users/1",
        params: {
          id: "string",
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.deleteUserById)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error("Error getting user by id");
        });

      await UserController.deleteUserById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateUserPassword", () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
      req = {
        body: { id: 1, user_password: "newPassword" },
      } as unknown as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(null),
      } as unknown as Response;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return 200 and 'Successfully updated password'", async () => {
      when(UserService.updateUserPassword)
        .calledWith(req.body)
        .mockResolvedValue("Successfully updated password");

      await UserController.updateUserPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("Successfully updated password");
    });

    it("should return 500 if password is incorrect format", async () => {
      const inReq = {
        body: { id: 0, user_password: 0 },
      } as unknown as Request;
      await UserController.updateUserPassword(inReq, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Could not update password.");
    });

    it("should return 500 if id is incorrect format", async () => {
      const inReq = {
        body: { id: "string", user_password: 0 },
      } as unknown as Request;
      await UserController.updateUserPassword(inReq, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Could not update password.");
    });
  });
});
