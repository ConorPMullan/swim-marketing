import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { ICreateInfluencer } from "../../interfaces";
import { InfluencerService } from "../influencers";
import { prisma } from "../../utils";

const req = request(app);

describe("/influencers", () => {
  const exampleCreateInfluencer: ICreateInfluencer = {
    influencer_name: "John Smith",
    email: "john@email.com",
    price_per_post: "150",
    is_active: true,
    platform_id: 3,
  };
  const exampleIncorrectCreateInfluencer = {
    influencer_name: "J",
    email: "joh",
    price_per_post: 150,
    is_active: "string",
    platform_id: "string",
  };
  const exampleGetInfluencersFromDb = [
    {
      id: 1,
      influencer_name: "John Smith",
      email: "john@email.com",
      price_per_post: "150",
      is_active: true,
      platform_id: 3,
    },
    {
      id: 2,
      influencer_name: "Jane Doe",
      email: "jane@email.com",
      price_per_post: "200",
      is_active: false,
      platform_id: 2,
    },
  ];
  const exampleGetInfluencersByCampaign = [
    {
      influencer: {
        id: 1,
        influencer_name: "John Smith",
        email: "john@email.com",
        price_per_post: "150",
        is_active: true,
        platform_id: 3,
      },
    },
    {
      influencer: {
        id: 2,
        influencer_name: "Jane Doe",
        email: "jane@email.com",
        price_per_post: "200",
        is_active: false,
        platform_id: 2,
      },
    },
  ];
  const exampleGetInfluencers = [
    {
      influencerId: 1,
      influencerName: "John Smith",
      email: "john@email.com",
      pricePerPost: "150",
      isActive: true,
    },
    {
      influencerId: 2,
      influencerName: "Jane Doe",
      email: "jane@email.com",
      pricePerPost: "200",
      isActive: false,
    },
  ];

  const exampleGetInfluencer = {
    id: 1,
    influencerName: "John Smith",
    email: "john@email.com",
    pricePerPost: "150",
    isActive: true,
  };

  const exampleUpdateInfluencers = {
    id: 1,
    influencer_name: "John Smith",
    email: "john@email.com",
    price_per_post: "150",
    is_active: true,
    platform_id: 3,
  };
  const exampleUpdateInfluencersIncorrectFormat = {
    id: 1,
    influencer_name: "J",
    email: "joh",
    price_per_post: 150,
    is_active: "string",
    platform_id: "string",
  };
  const exampleCampaignInfluencer = {
    id: 1,
    campaign_id: 1,
    influencer_id: 1,
  };
  const exampleInfluencerDelete = {
    influencerId: 1,
  };

  const exampleInfluencerResponse = {
    influencerName: "John Smith",
    email: "john@email.com",
    pricePerPost: "150",
    isActive: true,
    platformId: 3,
  };

  describe("POST /influencers", () => {
    it("should create a new influencer when correct body is passed", async () => {
      const result = await InfluencerService.createInfluencer(
        exampleCreateInfluencer
      );
      expect(prisma.influencer.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleInfluencerResponse);
    });

    it("should throw a 500 when error in database", async () => {
      const res = await req
        .post("/api/influencers/")
        .send(exampleCreateInfluencer);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create influencer.");
    });

    it("should throw an error when trying to create a new influencer when but incorrect body is passed", async () => {
      await expect(
        InfluencerService.createInfluencer(exampleCreateInfluencer)
      ).rejects.toThrow("Cannot create influencer");
    });
  });

  describe("GET /influencers", () => {
    it("should get all influencers", async () => {
      const result = await InfluencerService.getAllInfluencers();
      expect(prisma.influencer.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetInfluencers);
    });

    it("should throw an error and return 500 if error getting all influencers from database", async () => {
      await expect(InfluencerService.getAllInfluencers()).rejects.toThrow(
        "Cannot get influencers"
      );
    });
  });

  describe("GET /influencers/:id", () => {
    it("should get influencer by id", async () => {
      const result = await InfluencerService.getInfluencerById(1);
      expect(prisma.influencer.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetInfluencer);
    });

    it("should return 500 status code and error if database is unable to get influencer by id", async () => {
      await expect(InfluencerService.getInfluencerById(NaN)).rejects.toThrow(
        "Cannot get influencer by id"
      );
    });
  });

  describe("GET /influencers/campaigns/:id", () => {
    it("should get influencer by campaign id", async () => {
      const result = await InfluencerService.getInfluencersByCampaign(1);
      expect(prisma.campaign_influencer.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetInfluencers);
    });

    it("should return 500 status code and error if database is unable to get influencer by id", async () => {
      await expect(
        InfluencerService.getInfluencersByCampaign(NaN)
      ).rejects.toThrow("Cannot get influencers by campaign id");
    });
  });

  describe("PUT /influencers/:id", () => {
    it("should get update influencer by id", async () => {
      const result = await InfluencerService.updateInfluencerDetails(
        exampleUpdateInfluencers
      );
      expect(prisma.influencer.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateInfluencers);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      await expect(
        InfluencerService.updateInfluencerDetails(exampleUpdateInfluencers)
      ).rejects.toThrow("Cannot update influencer");
    });
  });

  describe("DELETE /influencers/", () => {
    it("should delete influencer by id", async () => {
      const result = await InfluencerService.deleteInfluencerById(1);
      expect(prisma.influencer.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ influencerId: 1 });
    });
    it("should throw an 404 if invalid id to delete", async () => {
      await expect(InfluencerService.deleteInfluencerById(1)).rejects.toThrow(
        "Cannot delete influencer"
      );
    });
  });
});
