import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { when } from "jest-when";
import { CampaignService } from "../../services/campaigns";
import { StatusCodes } from "http-status-codes";
import { CampaignController } from "../campaigns";
import { Campaign, ICampaign, ICreateCampaign } from "../../interfaces";

jest.mock("../../services/campaigns");

jest.mock("@prisma/client");
describe("CampaignController", () => {
  describe("getCampaigns", () => {
    it("returns status code `200` and an array of campaigns", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/",
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue: ICampaign[] = [
        {
          campaignId: 1,
          campaignName: "Summer Promotion",
          startDate: null,
          endDate: null,
        },
        {
          campaignId: 2,
          campaignName: "Winter Promotion",
          startDate: null,
          endDate: null,
        },
      ];
      when(CampaignService.getAllCampaigns)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await CampaignController.getAllCampaigns(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()[0]).toEqual(returnValue[0]);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/",
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.getAllCampaigns)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error("Error getting all campaigns");
        });

      await CampaignController.getAllCampaigns(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getCampaignById", () => {
    it("returns status code `200` and an array of campaigns", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        campaignId: 1,
        campaignName: "Summer Promotion",
        startDate: null,
        endDate: null,
      };
      when(CampaignService.getCampaignById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await CampaignController.getCampaignById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.getCampaignById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting campaign by id");
        });

      await CampaignController.getCampaignById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getCampaignByInfluencerId", () => {
    it("returns status code `200` and an array of campaigns", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/influencers/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const nd = new Date();
      const returnValue = {
        campaignId: 1,
        campaignName: "Summer Promotion",
        startDate: null,
        endDate: null,
      };
      when(CampaignService.getCampaignsByInfluencer)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await CampaignController.getCampaignsByInfluencers(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual([returnValue]);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/influencers/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        campaignId: 1,
        campaignName: "Summer Promotion",
        startDate: new Date(),
        endDate: new Date(),
      };
      when(CampaignService.getCampaignsByInfluencer)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await CampaignController.getCampaignsByInfluencers(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/campaigns/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.getCampaignsByInfluencer)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting campaign by id");
        });

      await CampaignController.getCampaignsByInfluencers(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("createCampaign", () => {
    const createBody: ICreateCampaign = {
      campaign_name: "John Smith",
      campaign_start_date: new Date(),
      end_date: new Date(),
      client_id: 1,
    };
    const invalidCreateBody = {
      campaign_name: "",
      campaign_start_date: new Date(),
      end_date: new Date(),
      client_id: NaN,
    };
    it("returns status code `200` if campaign is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/campaigns",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        campaign_name: "Summer Promotion",
        campaign_start_date: new Date(),
        end_date: new Date(),
      };
      when(CampaignService.createCampaign)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await CampaignController.createCampaign(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/campaigns",
        body: invalidCreateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.createCampaign)
        .calledWith(invalidCreateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting campaign by id");
        });

      await CampaignController.createCampaign(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateCampaignDetails", () => {
    const updateBody = {
      id: 1,
      campaign_name: "John Smith",
      campaign_start_date: new Date(),
      end_date: new Date(),
      client_id: 1,
    };
    const invalidUpdateBody = {
      id: NaN,
      campaign_name: "John Smith",
      campaign_start_date: new Date(),
      end_date: new Date(),
      client_id: NaN,
    };
    it("returns status code `200` if campaign is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/campaigns",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        campaignId: 1,
        campaignName: "John Smith",
        emailAddress: "JohnSmith@example.com",
      };
      when(CampaignService.updateCampaignDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await CampaignController.updateCampaignDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/campaigns",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.updateCampaignDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting campaign by id");
        });

      await CampaignController.updateCampaignDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteCampaignById", () => {
    it("returns status code `200` if campaign is successfully delete", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/campaigns",
        body: {
          campaignId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.deleteCampaignById).calledWith(request.body)
        .mockResolvedValue;

      await CampaignController.deleteCampaignById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an invalid id is passed", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/campaigns/1",
        params: {
          id: "string",
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(CampaignService.deleteCampaignById)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error("Error getting campaign by id");
        });

      await CampaignController.deleteCampaignById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/campaigns",
        body: {
          campaignId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(await CampaignService.deleteCampaignById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await CampaignController.deleteCampaignById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
});
