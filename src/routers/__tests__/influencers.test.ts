import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import { Influencer, IInfluencer, ICreateInfluencer } from "../../interfaces";

const req = request(app);
jest.mock("@prisma/client");
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
      jest.mock("../../controllers/influencers");
      prismaAsAny.influencer = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateInfluencer),
      };
      prismaAsAny.campaign_influencer = {
        create: jest.fn().mockResolvedValueOnce(exampleCampaignInfluencer),
      };
      const res = await req
        .post("/api/influencers")
        .send(exampleCreateInfluencer);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(exampleInfluencerResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.influencer = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req
        .post("/api/influencers/")
        .send(exampleCreateInfluencer);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create influencer.");
    });

    it("should throw an error when trying to create a new influencer when but incorrect body is passed", async () => {
      prismaAsAny.influencer = {
        create: jest
          .fn()
          .mockResolvedValueOnce(exampleIncorrectCreateInfluencer),
      };
      const res = await req
        .post("/api/influencers/")
        .send(exampleIncorrectCreateInfluencer);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /influencers", () => {
    it("should get all influencers", async () => {
      prismaAsAny.influencer = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetInfluencersFromDb),
      };
      const res = await req.get("/api/influencers/");
      expect(res.status).toBe(200);

      expect(res.body).toEqual(exampleGetInfluencers);
    });

    it("should throw an error and return 500 if error getting all influencers from database", async () => {
      prismaAsAny.influencer = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/influencers");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no influencers,", async () => {
      prismaAsAny.influencer = {
        findMany: jest.fn().mockReturnValueOnce([]),
      };
      const res = await req.get("/api/influencers/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /influencers/:id", () => {
    it("should get influencer by id", async () => {
      prismaAsAny.influencer = {
        findUnique: jest
          .fn()
          .mockReturnValueOnce(exampleGetInfluencersFromDb[0]),
      };
      const res = await req.get("/api/influencers/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetInfluencer);
    });

    it("should return 500 status code and error if database is unable to get influencer by id", async () => {
      prismaAsAny.influencer = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/influencers/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot find influencer id");
    });

    it("should return error if id does not exist", async () => {
      const res = await req.get("/api/influencers/string");
      expect(res.status).toBe(400);
      expect(res.body).toBe("Requires valid influencerId");
    });
  });

  describe("PUT /influencers/:id", () => {
    it("should get update influencer by id", async () => {
      jest.mock("../../controllers/influencers");
      prismaAsAny.influencer = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateInfluencers),
      };
      const res = await req
        .put("/api/influencers")
        .send(exampleUpdateInfluencers);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateInfluencers);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.influencer = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req
        .put("/api/influencers")
        .send(exampleUpdateInfluencers);
      expect(res.status).toBe(500);
    });

    it("should throw an error if an incorrect email is passed to update influencer by id", async () => {
      const res = await req
        .put("/api/influencers")
        .send(exampleUpdateInfluencersIncorrectFormat);
      expect(res.status).toBe(404);
    });

    it("should throw an error if an incorrect body is passed to update influencer by id", async () => {
      const res = await req.put("/api/influencers").send({});
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /influencers/", () => {
    it("should delete influencer by id", async () => {
      prismaAsAny.influencer = {
        update: jest.fn().mockReturnValueOnce(exampleInfluencerDelete),
      };
      const res = await req
        .delete("/api/influencers/")
        .send(exampleInfluencerDelete);
      expect(res.status).toBe(200);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      jest.mock("../../controllers/influencers");
      prismaAsAny.influencer = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/influencers/string");
      expect(res.status).toBe(404);
    });
    it("should throw an error if no id to delete", async () => {
      prismaAsAny.influencer = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/influencers");

      expect(res.status).toBe(400);
    });
  });
});
