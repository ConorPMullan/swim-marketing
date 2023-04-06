import request from "supertest";
import { app } from "../../app";

describe("/users", () => {
  describe("GET /users", () => {
    it("should get all users", async () => {
      await request(app)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:id", () => {
    it("should get user by id", async () => {
      await request(app)
        .get("/api/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/api/users/a")
        .set("Accept", "application/json")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(404);
    });
  });

  describe("PUT /users/:id", () => {
    const verifyUserUpdateValidation = (res) => {
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
              param: "user_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "user_name",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              msg: "your password should have min and max length between 8-15",
              param: "user_password",
              location: "body",
            }),
            expect.objectContaining({
              msg: "your password should have at least one number",
              param: "user_password",
              location: "body",
            }),
            expect.objectContaining({
              msg: "your password should have at least one special character",
              param: "user_password",
              location: "body",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when user updated successfully", async () => {
      const updatedUser = {
        user_level_id: 1,
        email: "email1@unosquare.com",
        user_password: "password1!",
        user_name: "first",
        id: 1,
      };
      const res = await request(app)
        .put("/api/users/1")
        .set("Accept", "application/json; charset=utf-8")
        .send(updatedUser)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);

      expect(res.body).toEqual(expect.objectContaining({ ...updatedUser }));
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/api/users/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(404)
        .expect(verifyUserUpdateValidation);
    });
  });
  // describe("DELETE /users/:id", () => {
  //   it("respond with 200 when users deleted", async () => {
  //     await request(app).delete("/api/users/1").expect(204);
  //   }, 5000);
  // });
});
