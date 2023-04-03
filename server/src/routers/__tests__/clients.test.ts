import request from "supertest";
import { app } from "../../../app";

describe("/clients", () => {
  describe("POST /clients", () => {
    const verifyClientValidation = (res) => {
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
              param: "client_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "client_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "user_id",
              location: "body",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when client created successfully", async () => {
      const newClient = {
        email: "email@unosquare.com",
        client_name: "fname",
        user_id: 1,
        company_name: "Test Company",
      };
      await request(app)
        .post("/api/clients")
        .set("Accept", "application/json")
        .send(newClient)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 404 for missing data", async () => {
      await request(app)
        .post("/api/clients")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(404)
        .expect(verifyClientValidation);
    });
  });

  describe("GET /clients", () => {
    it("should get all clients", async () => {
      await request(app)
        .get("/api/clients")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /clients/:id", () => {
    it("should get client by id", async () => {
      await request(app)
        .get("/api/clients/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/api/clients/a")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("PUT /clients/:id", () => {
    const verifyClientUpdateValidation = (res) => {
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
              param: "client_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "client_name",
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

    it("respond with 200 when client updated successfully", async () => {
      const updatedClient = {
        emailAddress: "email1@unosquare.com",
        clientName: "first",
        companyName: "Test Company",
        users: {},
        campaigns: [],
        appointments: {},
        clientId: 1,
      };
      const updatedClientResponse = {
        email: "email1@unosquare.com",
        company_name: "Test Company",
        client_name: "first",
        id: 1,
      };
      const res = await request(app)
        .put("/api/clients/")
        .set("Accept", "application/json; charset=utf-8")
        .send(updatedClient)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
      expect(res.body).toEqual(
        expect.objectContaining({ ...updatedClientResponse })
      );
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/clients/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect(404);
    });
  });
  // describe("DELETE /clients/:id", () => {
  //   it("respond with 200 when clients deleted", async () => {
  //     await request(app).delete("/api/clients/1").expect(204);
  //   }, 5000);
  // });
});
