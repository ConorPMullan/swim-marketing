import request from "supertest";
import { app } from "../../../app";

describe("/influencers", () => {
  describe("POST /influencers", () => {
    const verifyInfluencerValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
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
              param: "influencer_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "influencer_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "is_active",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "platform_id",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "price_per_post",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "price_per_post",
              location: "body",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when influencer created successfully", async () => {
      const newInfluencer = {
        influencer_name: "John Smith",
        email: "john@email.com",
        price_per_post: "150",
        is_active: true,
        platform_id: 3,
      };
      await request(app)
        .post("/api/influencers")
        .set("Accept", "application/json")
        .send(newInfluencer)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 404 for missing data", async () => {
      await request(app)
        .post("/api/influencers")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(404)
        .expect(verifyInfluencerValidation);
    });
  });

  describe("GET /influencers", () => {
    it("should get all influencers", async () => {
      await request(app)
        .get("/api/influencers")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /influencers/:id", () => {
    it("should get influencer by id", async () => {
      await request(app)
        .get("/api/influencers/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/api/influencers/a")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("PUT /influencers/:id", () => {
    const verifyInfluencerUpdateValidation = (res) => {
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
              param: "influencer_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "influencer_name",
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

    it("respond with 200 when influencer updated successfully", async () => {
      const updatedInfluencer = {
        id: 1,
        influencer_name: "John Smith",
        email: "john@email.com",
        price_per_post: "150",
        is_active: true,
        platform_id: 1,
      };

      const res = await request(app)
        .put("/api/influencers/")
        .set("Accept", "application/json; charset=utf-8")
        .send(updatedInfluencer)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({ ...updatedInfluencer })
      );
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/influencers/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect(404);
    });
  });
  // describe("DELETE /influencers/:id", () => {
  //   it("respond with 200 when influencers deleted", async () => {
  //     await request(app).delete("/api/influencers/1").expect(204);
  //   }, 5000);
  // });
});
