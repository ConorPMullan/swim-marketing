import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { when } from "jest-when";
import { InfluencerService } from "../../services/influencers";
import { StatusCodes } from "http-status-codes";
import { InfluencerController } from "../influencers";
import { IInfluencer } from "../../interfaces";

jest.mock("../../services/influencers");

jest.mock("@prisma/client");
describe("InfluencerController", () => {
  describe("getInfluencers", () => {
    it("returns status code `200` and an array of influencers", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/",
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue: IInfluencer[] = [
        {
          id: 1,
          influencerName: "John Smith",
          email: "johnsmith@gmail.com",
          pricePerPost: "150",
          isActive: true,
        },
        {
          id: 2,
          influencerName: "Jane Doe",
          email: "janedoe@gmail.com",
          pricePerPost: "200",
          isActive: false,
        },
      ];
      when(InfluencerService.getAllInfluencers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await InfluencerController.getAllInfluencers(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()[0]).toEqual(returnValue[0]);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/",
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.getAllInfluencers)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error("Error getting all influencers");
        });

      await InfluencerController.getAllInfluencers(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getInfluencerById", () => {
    it("returns status code `200` and an array of influencers", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.getInfluencerById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await InfluencerController.getInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `400` if an invalid id is provided", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.getInfluencerById)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await InfluencerController.getInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.getInfluencerById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting influencer by id");
        });

      await InfluencerController.getInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getInfluencerByUserId", () => {
    it("returns status code `200` and an array of influencers", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/campaign/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.getInfluencersByCampaign)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await InfluencerController.getInfluencersByCampaign(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual([returnValue]);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/users/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.getInfluencersByCampaign)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await InfluencerController.getInfluencersByCampaign(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/influencers/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.getInfluencersByCampaign)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting influencer by id");
        });

      await InfluencerController.getInfluencersByCampaign(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("createInfluencer", () => {
    const createBody = {
      influencer_name: "John Smith",
      email: "JohnSmith@example.com",
      price_per_post: "150",
      is_active: true,
      platform_id: 1,
    };
    const invalidCreateBody = {
      influencer_name: "",
      email: "",
      price_per_post: "",
      is_active: true,
      platform_id: NaN,
    };
    it("returns status code `200` if influencer is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/influencers",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.createInfluencer)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await InfluencerController.createInfluencer(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/influencers",
        body: invalidCreateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.createInfluencer)
        .calledWith(invalidCreateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting influencer by id");
        });

      await InfluencerController.createInfluencer(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateInfluencerDetails", () => {
    const updateBody = {
      id: 1,
      influencer_name: "John Smith",
      email: "johnsmith@gmail.com",
      price_per_post: "150",
      is_active: true,
    };
    const invalidUpdateBody = {
      id: 0,
      influencer_name: "",
      email: "",
      price_per_post: "",
      is_active: true,
      platform_id: NaN,
    };
    it("returns status code `200` if influencer is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/influencers",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        influencerName: "John Smith",
        email: "johnsmith@gmail.com",
        pricePerPost: "150",
        isActive: true,
      };
      when(InfluencerService.updateInfluencerDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await InfluencerController.updateInfluencerDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/influencers",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.updateInfluencerDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting influencer by id");
        });

      await InfluencerController.updateInfluencerDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteInfluencerById", () => {
    it("returns status code `200` if influencer is successfully delete", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/influencers",
        body: {
          influencerId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.deleteInfluencerById).calledWith(request.body)
        .mockResolvedValue;

      await InfluencerController.deleteInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an invalid id is passed", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/influencers/1",
        params: {
          id: "string",
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(InfluencerService.deleteInfluencerById)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error("Error getting influencer by id");
        });

      await InfluencerController.deleteInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/influencers",
        body: {
          influencerId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(await InfluencerService.deleteInfluencerById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await InfluencerController.deleteInfluencerById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
});
