import request from "supertest";
import { app } from "../../../app";

describe("/appointments", () => {
  describe("POST /appointments", () => {
    const verifyAppointmentValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "location",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "location",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "description",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "description",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "user_id",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "client_id",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "client_id",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "duration",
              location: "body",
            }),
            expect.objectContaining({
              msg: "Invalid value",
              param: "scheduled_date_time",
              location: "body",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when appointment created successfully", async () => {
      const newAppointment = {
        description: "description",
        scheduled_date_time: new Date(),
        duration: 30,
        location: "location",
        user_id: 1,
        client_id: 1,
      };
      await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .send(newAppointment)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 404 for missing data", async () => {
      await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(404)
        .expect(verifyAppointmentValidation);
    });
  });

  describe("GET /appointments", () => {
    it("should get all appointments", async () => {
      await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /appointments/:id", () => {
    it("should get appointment by id", async () => {
      await request(app)
        .get("/api/appointments/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/api/appointments/a")
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("PUT /appointments/:id", () => {
    const verifyAppointmentUpdateValidation = (res) => {
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
              param: "appointment_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "appointment_name",
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

    it("respond with 200 when appointment updated successfully", async () => {
      const updatedAppointment = {
        id: 1,
        description: "John Smith",
        location: "JohnSmith@example.com",
        scheduled_date_time: null,
        duration: 10,
      };
      const updatedAppointmentResponse = {
        id: 1,
        description: "John Smith",
        location: "JohnSmith@example.com",
        scheduled_date_time: null,
        duration: 10,
      };

      const res = await request(app)
        .put("/api/appointments/")
        .set("Accept", "application/json; charset=utf-8")
        .send(updatedAppointment)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({ ...updatedAppointmentResponse })
      );
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/appointments/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect(404);
    });
  });
  // describe("DELETE /appointments/:id", () => {
  //   it("respond with 200 when appointments deleted", async () => {
  //     await request(app).delete("/api/appointments/1").expect(204);
  //   }, 5000);
  // });
});
