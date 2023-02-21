import request from "supertest";
import { app } from "../../../app";

describe("/campaigns", () => {
  describe("POST /campaigns", () => {
    const verifyCampaignValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "campaign_start_date",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "campaign_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "campaign_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "end_date",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "client_id",
              location: "body",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when campaign created successfully", async () => {
      const newCampaign = {
        campaign_name: "Summer Promotion",
        campaign_start_date: new Date(),
        end_date: new Date(),
        client_id: 1,
      };
      await request(app)
        .post("/api/campaigns")
        .set("Accept", "application/json")
        .send(newCampaign)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 404 for missing data", async () => {
      await request(app)
        .post("/api/campaigns")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(404)
        .expect(verifyCampaignValidation);
    });
  });

  describe("GET /campaigns", () => {
    it("should get all campaigns", async () => {
      await request(app)
        .get("/api/campaigns")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /campaigns/:id", () => {
    it("should get campaign by id", async () => {
      await request(app)
        .get("/api/campaigns/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/api/campaigns/a")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("PUT /campaigns/:id", () => {
    const verifyCampaignUpdateValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "id",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "campaign_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "campaign_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "user_id",
              msg: "Invalid value",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when campaign updated successfully", async () => {
      const updatedCampaign = {
        id: 1,
        campaign_name: "Winter Promotion",
        campaign_start_date: null,
        end_date: null,
        client_id: 1,
      };
      const updatedCampaignResponse = {
        id: 1,
        campaign_name: "Winter Promotion",
        campaign_start_date: null,
        end_date: null,
      };

      const res = await request(app)
        .put("/api/campaigns/")
        .set("Accept", "application/json; charset=utf-8")
        .send(updatedCampaign)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({ ...updatedCampaignResponse })
      );
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/campaigns/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect(404);
    });
  });
  // describe("DELETE /campaigns/:id", () => {
  //   it("respond with 200 when campaigns deleted", async () => {
  //     await request(app).delete("/api/campaigns/1").expect(204);
  //   }, 5000);
  // });
});
