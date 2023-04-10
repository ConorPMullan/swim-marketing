import request from "supertest";
import { app } from "../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { ICreateCampaign } from "../../interfaces";
import { CampaignService } from "../campaigns";
import { prisma } from "../../utils";

const req = request(app);
jest.mock("@prisma/client");
describe("/campaigns", () => {
  const exampleCreateCampaign: ICreateCampaign = {
    campaignName: "Summer Promotion",
    startDate: null,
    endDate: null,
    clientId: 1,
  };
  const exampleIncorrectCreateCampaign = {
    campaign_name: 0,
    campaign_start_date: "sd",
    end_date: "ed",
    client_id: "string",
  };
  const exampleGetCampaignsFromDb = [
    {
      id: 1,
      campaign_name: "Summer Promotion",
      campaign_start_date: null,
      end_date: null,
      client_id: 1,
      client: {
        client_name: "Alice Smith",
        company_name: "Novexa Corp",
        email: "alice.smith@example.com",
        id: 1,
      },
      company_name: "Novexa Corp",
    },
    {
      id: 2,
      campaign_name: "Winter Promotion",
      campaign_start_date: null,
      end_date: null,
      client_id: 3,
      client: {
        client_name: "Test Client Smith",
        company_name: "Test Company Two",
        email: "test.client.smith@example.com",
        id: 3,
      },
      company_name: "Test Company Two",
    },
  ];
  const exampleGetCampaignsByInfluencer = [
    {
      campaign: {
        id: 1,
        campaign_name: "Summer Promotion",
        campaign_start_date: null,
        end_date: null,
        client_id: 1,
      },
    },
    {
      campaign: {
        id: 2,
        campaign_name: "Winter Promotion",
        campaign_start_date: null,
        end_date: null,
        client_id: 3,
      },
    },
  ];
  const exampleGetCampaigns = [
    {
      campaignId: 1,
      campaignName: "Summer Promotion",
      startDate: null,
      endDate: null,
      clientId: 1,
      client: {
        client_name: "Alice Smith",
        company_name: "Novexa Corp",
        email: "alice.smith@example.com",
        id: 1,
      },
      companyName: "Novexa Corp",
    },
    {
      campaignId: 2,
      campaignName: "Winter Promotion",
      startDate: null,
      endDate: null,
      clientId: 3,
      client: {
        client_name: "Test Client Smith",
        company_name: "Test Company Two",
        email: "test.client.smith@example.com",
        id: 3,
      },
      companyName: "Test Company Two",
    },
  ];

  const exampleGetCampaign = {
    campaignId: 1,
    campaignName: "Summer Promotion",
    startDate: null,
    endDate: null,
    clientId: 1,
  };

  const exampleGetInfluencerCampaign = {
    campaignId: 1,
    campaignName: "Summer Promotion",
    startDate: null,
    endDate: null,
  };

  const exampleUpdateCampaigns = {
    campaignId: 1,
    campaignName: "Winter Promotion",
    startDate: null,
    endDate: null,
    clientId: 3,
  };
  const exampleUpdateCampaignsResponse = {
    campaignId: 1,
    campaignName: "Winter Promotion",
    startDate: null,
    endDate: null,
    clientId: 3,
  };
  const exampleUpdateCampaignsIncorrectFormat = {
    id: 1,
    campaign_name: "J",
    email: "joh",
    price_per_post: 150,
    is_active: "string",
    platform_id: "string",
  };
  const exampleClientCampaign = {
    id: 1,
    client_id: 1,
    campaign_id: 1,
  };
  const exampleCampaignDelete = {
    campaignId: 1,
  };

  const exampleCampaignResponse = {
    campaign_name: "Summer Promotion",
    campaign_start_date: null,
    end_date: null,
    id: 1,
    client_id: 1,
  };

  describe("POST /campaigns", () => {
    it("should create a new campaign when correct body is passed", async () => {
      prismaAsAny.campaign = {
        create: jest.fn().mockReturnValueOnce(exampleGetCampaignsFromDb[0]),
      };
      prismaAsAny.client_campaign = {
        create: jest.fn().mockReturnValueOnce({ client_id: 1, campaign_id: 1 }),
      };
      const result = await CampaignService.createCampaign(
        exampleCreateCampaign
      );
      expect(prisma.campaign.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleCampaignResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.client_campaign = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        CampaignService.createCampaign(exampleCreateCampaign)
      ).rejects.toThrow("Cannot create campaign");
    });
  });

  describe("GET /campaigns", () => {
    it("should get all campaigns", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetCampaignsFromDb),
      };
      const result = await CampaignService.getAllCampaigns();
      expect(prisma.campaign.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetCampaigns);
    });

    it("should throw an error and return 500 if error getting all campaigns from database", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(CampaignService.getAllCampaigns()).rejects.toThrow(
        "Cannot get campaigns"
      );
    });
  });

  describe("GET /campaigns/:id", () => {
    it("should get campaign by id", async () => {
      prismaAsAny.campaign = {
        findUnique: jest.fn().mockReturnValueOnce(exampleGetCampaignsFromDb[0]),
      };

      const result = await CampaignService.getCampaignById(1);
      expect(prisma.campaign.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetCampaign);
    });

    it("should return 500 status code and error if database is unable to get campaign by id", async () => {
      prismaAsAny.campaign = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(CampaignService.getCampaignById(NaN)).rejects.toThrow(
        "Cannot get campaign by id"
      );
    });
  });

  describe("GET /campaigns/influencers/:id", () => {
    it("should get campaign by influencer id", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetCampaignsFromDb),
      };
      prismaAsAny.campaign_influencer = {
        findMany: jest.fn().mockResolvedValueOnce([
          {
            id: 1,
            campaign: exampleGetCampaignsFromDb[0],
          },
        ]),
      };
      const result = await CampaignService.getCampaignsByInfluencer(1);
      expect(prisma.campaign_influencer.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([exampleGetInfluencerCampaign]);
    });

    it("should return 500 status code and error if database is unable to get campaign by id", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      prismaAsAny.campaign_influencer = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        CampaignService.getCampaignsByInfluencer(NaN)
      ).rejects.toThrow("Cannot get campaigns by influencer");
    });
  });

  describe("PUT /campaigns/:id", () => {
    it("should get update campaign by id", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateCampaigns),
      };
      const result = await CampaignService.updateCampaignDetails(
        exampleUpdateCampaigns
      );
      expect(prisma.campaign.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateCampaignsResponse);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        CampaignService.updateCampaignDetails(exampleUpdateCampaigns)
      ).rejects.toThrow("Cannot update campaign");
    });
  });

  describe("DELETE /campaigns/", () => {
    it("should delete campaign by id", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateCampaigns),
      };
      const result = await CampaignService.deleteCampaignById(1);
      expect(prisma.campaign.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateCampaigns);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(CampaignService.deleteCampaignById(NaN)).rejects.toThrow(
        "Could not delete campaign"
      );
    });
  });
});
