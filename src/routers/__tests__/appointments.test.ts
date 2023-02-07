import request from "supertest";
import { app } from "../../../app";
import { prismaAsAny } from "../../test-utils/prisma";
import {
  Appointment,
  IAppointment,
  ICreateAppointment,
} from "../../interfaces";

const req = request(app);
jest.mock("@prisma/client");
describe("/appointments", () => {
  const newDate = new Date();
  const exampleCreateAppointment: ICreateAppointment = {
    description: "description",
    scheduled_date_time: new Date(),
    duration: 30,
    location: "location",
    user_id: 1,
    client_id: 1,
  };
  const exampleIncorrectCreateAppointment = {
    description: "de",
    scheduled_date_time: new Date(),
    duration: "string",
    location: "l",
    user_id: "string",
    client_id: "string",
  };
  const exampleGetAppointmentsFromDb = [
    {
      id: 1,
      description: "John Smith",
      location: "JohnSmith@example.com",
      scheduled_date_time: newDate.toISOString(),
      duration: 10,
    },
    {
      id: 2,
      description: "Jane Doe",
      location: "JaneDoe@example.com",
      scheduled_date_time: newDate.toISOString(),
      duration: 40,
    },
  ];
  const exampleGetAppointments = [
    {
      id: 1,
      description: "John Smith",
      location: "JohnSmith@example.com",
      scheduledDateTime: newDate.toISOString(),
      duration: 10,
    },
    {
      id: 2,
      description: "Jane Doe",
      location: "JaneDoe@example.com",
      scheduledDateTime: newDate.toISOString(),
      duration: 40,
    },
  ];

  const exampleUpdateAppointments = {
    id: 1,
    description: "John Smith",
    location: "JohnSmith@example.com",
    scheduled_date_time: newDate.toISOString(),
    duration: 10,
  };
  const exampleUpdateAppointmentsIncorrectFormat = {
    id: 1,
    description: "J",
    location: "Joh",
    scheduledDateTime: "not a date",
    duration: "10",
  };
  const exampleUserClientAppointment = {
    id: 1,
    user_id: 1,
    client_id: 1,
    appointment_id: 1,
  };
  const exampleAppointmentDelete = {
    appointmentId: 1,
  };

  const exampleAppointmentResponse = {
    description: "description",
    scheduled_date_time: newDate.toISOString(),
    duration: 30,
    location: "location",
  };

  describe("POST /appointments", () => {
    it("should create a new appointment when correct body is passed", async () => {
      jest.mock("../../controllers/appointments");
      prismaAsAny.appointment = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateAppointment),
      };
      prismaAsAny.appointment_user_client = {
        create: jest.fn().mockResolvedValueOnce(exampleUserClientAppointment),
      };
      const res = await req
        .post("/api/appointments")
        .send(exampleCreateAppointment);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(exampleAppointmentResponse);
    });

    it("should throw a 500 when error in database", async () => {
      prismaAsAny.appointment = {
        create: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req
        .post("/api/appointments/")
        .send(exampleCreateAppointment);
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Could not create appointment.");
    });

    it("should throw an error when trying to create a new appointment when but incorrect body is passed", async () => {
      prismaAsAny.appointment = {
        create: jest
          .fn()
          .mockResolvedValueOnce(exampleIncorrectCreateAppointment),
      };
      const res = await req
        .post("/api/appointments/")
        .send(exampleIncorrectCreateAppointment);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /appointments", () => {
    it("should get all appointments", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockReturnValueOnce(exampleGetAppointmentsFromDb),
      };
      const res = await req.get("/api/appointments/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetAppointments);
    });

    it("should throw an error and return 500 if error getting all appointments from database", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/appointments/");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot access database");
    });

    it("should get  empty array if there are no appointments,", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockReturnValueOnce([]),
      };
      const res = await req.get("/api/appointments/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /appointments/:id", () => {
    it("should get appointment by id", async () => {
      prismaAsAny.appointment = {
        findUnique: jest
          .fn()
          .mockReturnValueOnce(exampleGetAppointmentsFromDb[0]),
      };
      const res = await req.get("/api/appointments/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleGetAppointments[0]);
    });

    it("should return 500 status code and error if database is unable to get appointment by id", async () => {
      prismaAsAny.appointment = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      const res = await req.get("/api/appointments/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual("Cannot find appointment id");
    });

    it("should return error if id does not exist", async () => {
      const res = await req.get("/api/appointments/string");
      expect(res.status).toBe(400);
      expect(res.body).toBe("Requires valid appointmentId");
    });
  });

  describe("PUT /appointments/:id", () => {
    it("should get update appointment by id", async () => {
      jest.mock("../../controllers/appointments");
      prismaAsAny.appointment = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateAppointments),
      };
      const res = await req
        .put("/api/appointments")
        .send(exampleUpdateAppointments);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleUpdateAppointments);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req
        .put("/api/appointments")
        .send(exampleUpdateAppointments);
      expect(res.status).toBe(500);
    });

    it("should throw an error if an incorrect email is passed to update appointment by id", async () => {
      const res = await req
        .put("/api/appointments")
        .send(exampleUpdateAppointmentsIncorrectFormat);
      expect(res.status).toBe(404);
    });

    it("should throw an error if an incorrect body is passed to update appointment by id", async () => {
      const res = await req.put("/api/appointments").send({});
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /appointments/", () => {
    it("should delete appointment by id", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockReturnValueOnce(exampleAppointmentDelete),
      };
      const res = await req
        .delete("/api/appointments/")
        .send(exampleAppointmentDelete);
      expect(res.status).toBe(200);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      jest.mock("../../controllers/appointments");
      prismaAsAny.appointment = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error("error");
        }),
      };
      const res = await req.delete("/api/appointments/string");
      expect(res.status).toBe(404);
    });
    // it("should throw an error if no id to delete", async () => {
    //   jest.setTimeout(30000);
    //   prismaAsAny.appointment = {
    //     update: jest.fn().mockImplementationOnce(() => {
    //       throw new Error("error");
    //     }),
    //   };
    //   const res = await req.delete("/api/appointments");

    //   expect(res.status).toBe(400);
    // });
  });
});
