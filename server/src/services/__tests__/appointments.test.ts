import { ICreateAppointment } from "../../interfaces";
import { AppointmentService } from "../../services/appointments";
import { prismaAsAny } from "../../test-utils/prisma";
import { prisma } from "../../utils";
jest.mock("@prisma/client");
describe("/appointments", () => {
  const exampleCreateAppointment: ICreateAppointment = {
    description: "description",
    scheduled_date_time: null,
    duration: 30,
    location: "location",
    user_id: 1,
    client_id: 1,
  };
  const exampleIncorrectCreateAppointment = {
    description: "de",
    scheduled_date_time: null,
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
      scheduled_date_time: null,
      duration: 10,
    },
    {
      id: 2,
      description: "Jane Doe",
      location: "JaneDoe@example.com",
      scheduled_date_time: null,
      duration: 40,
    },
  ];

  const exampleGetAppointmentsBy = [
    {
      appointment: {
        id: 1,
        description: "John Smith",
        location: "JohnSmith@example.com",
        scheduled_date_time: null,
        duration: 10,
      },
    },
    {
      appointment: {
        id: 2,
        description: "Jane Doe",
        location: "JaneDoe@example.com",
        scheduled_date_time: null,
        duration: 40,
      },
    },
  ];
  const exampleGetAppointments = [
    {
      id: 1,
      description: "John Smith",
      location: "JohnSmith@example.com",
      scheduledDateTime: null,
      duration: 10,
    },
    {
      id: 2,
      description: "Jane Doe",
      location: "JaneDoe@example.com",
      scheduledDateTime: null,
      duration: 40,
    },
  ];

  const exampleUpdateAppointments = {
    id: 1,
    description: "John Smith",
    location: "JohnSmith@example.com",
    scheduled_date_time: null,
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
    scheduled_date_time: null,
    duration: 30,
    location: "location",
  };

  describe("POST /appointments", () => {
    it("should create a new appointment when correct body is passed", async () => {
      prismaAsAny.appointment = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateAppointment),
      };
      prismaAsAny.appointment_user_client = {
        create: jest.fn().mockResolvedValueOnce(exampleCreateAppointment),
      };
      const result = await AppointmentService.createAppointment(
        exampleCreateAppointment
      );
      expect(prisma.appointment.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleAppointmentResponse);
    });

    it("should throw a 500 when error in database", async () => {
      await expect(
        AppointmentService.createAppointment(exampleCreateAppointment)
      ).rejects.toThrow("Cannot create appointment");
    });
  });

  describe("GET /appointments", () => {
    it("should get all appointments", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetAppointmentsFromDb),
      };
      const result = await AppointmentService.getAllAppointments();
      expect(prisma.appointment.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetAppointments);
    });

    it("should throw an error and return 500 if error getting all appointments from database", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(AppointmentService.getAllAppointments()).rejects.toThrow(
        "Cannot get appointments"
      );
    });
  });

  describe("GET /appointments/:id", () => {
    it("should get appointment by id", async () => {
      prismaAsAny.appointment = {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(exampleGetAppointmentsFromDb[0]),
      };
      const result = await AppointmentService.getAppointmentById(1);
      expect(prisma.appointment.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleGetAppointments[0]);
    });

    it("should return 500 status code and error if database is unable to get appointment by id", async () => {
      prismaAsAny.appointment = {
        findUnique: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(AppointmentService.getAppointmentById(NaN)).rejects.toThrow(
        "Cannot get appointment by id"
      );
    });
  });

  describe("GET /appointments/users/:id", () => {
    it("should get appointment by user id", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetAppointmentsFromDb),
      };
      prismaAsAny.appointment_user_client = {
        findMany: jest.fn().mockResolvedValueOnce([
          {
            id: 1,
            user_id: 1,
            client_id: 1,
            appointment_id: 1,
            appointment: exampleGetAppointmentsFromDb[0],
          },
        ]),
      };
      const result = await AppointmentService.getAllAppointmentsByUser(1);
      expect(prisma.appointment_user_client.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([exampleGetAppointments[0]]);
    });

    it("should return 500 status code and error if database is unable to get appointment by id", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      prismaAsAny.appointment_user_client = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        AppointmentService.getAllAppointmentsByUser(NaN)
      ).rejects.toThrow("Cannot get appointments by user id");
    });
  });

  describe("GET /appointments/clients/:id", () => {
    it("should get appointment by client id", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockResolvedValueOnce(exampleGetAppointmentsFromDb),
      };
      prismaAsAny.appointment_user_client = {
        findMany: jest.fn().mockResolvedValueOnce([
          {
            id: 1,
            user_id: 1,
            client_id: 1,
            appointment_id: 1,
            appointment: exampleGetAppointmentsFromDb[0],
          },
        ]),
      };
      const result = await AppointmentService.getAllAppointmentsByClient(1);
      expect(prisma.appointment_user_client.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([exampleGetAppointments[0]]);
    });

    it("should return 500 status code and error if database is unable to get appointment by id", async () => {
      prismaAsAny.appointment = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      prismaAsAny.appointment_user_client = {
        findMany: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        AppointmentService.getAllAppointmentsByClient(NaN)
      ).rejects.toThrow("Cannot get appointments by client id");
    });
  });

  describe("PUT /appointments/:id", () => {
    it("should get update appointment by id", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockResolvedValueOnce(exampleUpdateAppointments),
      };
      const result = await AppointmentService.updateAppointmentDetails(
        exampleUpdateAppointments
      );
      expect(prisma.appointment.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateAppointments);
    });

    it("should throw a 500 error if there is an issue with the database", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(
        AppointmentService.updateAppointmentDetails(exampleUpdateAppointments)
      ).rejects.toThrow("Cannot update appointment");
    });
  });

  describe("DELETE /appointments/", () => {
    it("should delete appointment by id", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockResolvedValueOnce(exampleUpdateAppointments),
      };
      const result = await AppointmentService.deleteAppointmentById(1);
      expect(prisma.appointment.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateAppointments);
    });
    it("should throw an 404 if invalid id to delete", async () => {
      prismaAsAny.appointment = {
        update: jest.fn().mockImplementationOnce(() => {
          throw new Error();
        }),
      };
      await expect(AppointmentService.deleteAppointmentById(1)).rejects.toThrow(
        "Cannot delete appointment"
      );
    });
  });
});
