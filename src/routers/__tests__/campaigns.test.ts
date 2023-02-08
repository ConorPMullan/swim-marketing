import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { ICreateCampaign } from "../../interfaces";

const req = request(app);
jest.mock("@prisma/client");
describe("/campaigns", () => {
  const sd = new Date();
  const ed = new Date();

  const exampleCreateCampaign: ICreateCampaign = {
    campaign_name: "Summer Promotion",
    campaign_start_date: sd,
    end_date: ed,
    client_id: 1,
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
      campaign_start_date: sd,
      end_date: ed,
      client_id: 1,
    },
    {
      id: 2,
      campaign_name: "Winter Promotion",
      campaign_start_date: sd,
      end_date: ed,
      client_id: 3,
    },
  ];
  const exampleGetCampaigns = [
    {
      campaignId: 1,
      campaignName: "Summer Promotion",
      startDate: sd.toISOString(),
      endDate: ed.toISOString(),
    },
    {
      campaignId: 2,
      campaignName: "Winter Promotion",
      startDate: sd.toISOString(),
      endDate: ed.toISOString(),
    },
  ];

  const exampleGetCampaign = {
    campaignId: 1,
    campaignName: "Summer Promotion",
    startDate: sd.toISOString(),
    endDate: ed.toISOString(),
  };

  const exampleUpdateCampaigns = {
    id: 1,
    campaign_name: "Winter Promotion",
    campaign_start_date: sd,
    end_date: ed,
    client_id: 3,
  };
  const exampleUpdateCampaignsResponse = {
    id: 1,
    campaign_name: "Winter Promotion",
    campaign_start_date: sd.toISOString(),
    end_date: ed.toISOString(),
    client_id: 3,
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
    campaign_start_date: sd.toISOString(),
    end_date: ed.toISOString(),
  };

  describe("POST /campaigns", () => {
    it("should create a new campaign when correct body is passed", async () => {
      jest.mock("../../controllers/campaigns");
      prismaAsAny.campaign = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateCampaign),
      };
      prismaAsAny.client_campaign = {
        create: jest.fn().mockResolvedValueOnce(exampleClientCampaign),
      };
      const res = await req.post("/api/campaigns").send(exampleCreateCampaign);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(exampleCampaignResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.campaign = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.post("/api/campaigns/").send(exampleCreateCampaign);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create campaign.");
    });

    it("should throw an error when trying to create a new campaign when but incorrect body is passed", async () => {
      prismaAsAny.campaign = {
        create: jest.fn().mockResolvedValueOnce(exampleIncorrectCreateCampaign),
      };
      const res = await req
        .post("/api/campaigns/")
        .send(exampleIncorrectCreateCampaign);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /campaigns", () => {
    it("should get all campaigns", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetCampaignsFromDb),
      };
      const res = await req.get("/api/campaigns/");
      expect(res.body).toEqual(exampleGetCampaigns);
    });

    it("should throw an error and return 500 if error getting all campaigns from database", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/campaigns");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no campaigns,", async () => {
      prismaAsAny.campaign = {
        findMany: jest.fn().mockReturnValueOnce([]),
      };
      const res = await req.get("/api/campaigns/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /campaigns/:id", () => {
    it("should get campaign by id", async () => {
      prismaAsAny.campaign = {
        findUnique: jest.fn().mockReturnValueOnce(exampleGetCampaignsFromDb[0]),
      };
      const res = await req.get("/api/campaigns/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetCampaign);
    });

    it("should return 500 status code and error if database is unable to get campaign by id", async () => {
      prismaAsAny.campaign = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/campaigns/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot find campaign id");
    });

    it("should return error if id does not exist", async () => {
      const res = await req.get("/api/campaigns/string");
      expect(res.status).toBe(400);
      expect(res.body).toBe("Requires valid campaignId");
    });
  });

  describe("PUT /campaigns/:id", () => {
    it("should get update campaign by id", async () => {
      jest.mock("../../controllers/campaigns");
      prismaAsAny.campaign = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateCampaigns),
      };
      const res = await req.put("/api/campaigns").send(exampleUpdateCampaigns);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateCampaignsResponse);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.put("/api/campaigns").send(exampleUpdateCampaigns);
      expect(res.status).toBe(500);
    });

    it("should throw an error if an incorrect email is passed to update campaign by id", async () => {
      const res = await req
        .put("/api/campaigns")
        .send(exampleUpdateCampaignsIncorrectFormat);
      expect(res.status).toBe(404);
    });

    it("should throw an error if an incorrect body is passed to update campaign by id", async () => {
      const res = await req.put("/api/campaigns").send({});
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /campaigns/", () => {
    it("should delete campaign by id", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockReturnValueOnce(exampleCampaignDelete),
      };
      const res = await req
        .delete("/api/campaigns/")
        .send(exampleCampaignDelete);
      expect(res.status).toBe(200);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      jest.mock("../../controllers/campaigns");
      prismaAsAny.campaign = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/campaigns/string");
      expect(res.status).toBe(404);
    });
    it("should throw an error if no id to delete", async () => {
      prismaAsAny.campaign = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/campaigns");

      expect(res.status).toBe(400);
    });
  });
});
