import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Response } from "express";
import { when } from "jest-when";
import { AppointmentService } from "../../services/appointments";
import { StatusCodes } from "http-status-codes";
import { AppointmentController } from "../appointments";
import { IAppointment } from "../../interfaces";

jest.mock("../../services/appointments");

jest.mock("@prisma/client");
describe("AppointmentController", () => {
  describe("getAppointments", () => {
    it("returns status code `200` and an array of appointments", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/",
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue: IAppointment[] = [
        {
          id: 1,
          description: "description example",
          scheduledDateTime: null,
          endDateTime: null,
          location: "location example",
        },
        {
          id: 2,
          description: "description example 2",
          scheduledDateTime: null,
          endDateTime: null,
          location: "location example 2",
        },
      ];
      when(AppointmentService.getAllAppointments)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await AppointmentController.getAllAppointments(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()[0]).toEqual(returnValue[0]);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/",
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.getAllAppointments)
        .calledWith()
        .mockImplementationOnce(() => {
          throw Error("Error getting all appointments");
        });

      await AppointmentController.getAllAppointments(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getAppointmentById", () => {
    it("returns status code `200` and an array of appointments", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduledDateTime: null,
        endDateTime: null,
        location: "location example",
      };
      when(AppointmentService.getAppointmentById)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await AppointmentController.getAppointmentById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.getAppointmentById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.getAppointmentById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getAppointmentByUserId", () => {
    it("returns status code `200` and an array of appointments", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduledDateTime: null,
        endDateTime: null,
        location: "location example",
      };
      when(AppointmentService.getAllAppointmentsByUser)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await AppointmentController.getAppointmentsByUser(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual([returnValue]);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/users/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduledDateTime: null,
        endDateTime: null,
        location: "location example",
      };
      when(AppointmentService.getAllAppointmentsByUser)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await AppointmentController.getAppointmentsByUser(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/users/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.getAllAppointmentsByUser)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.getAppointmentsByUser(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("getAppointmentByClientId", () => {
    it("returns status code `200` and an array of appointments", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/clients/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduledDateTime: null,
        endDateTime: null,
        location: "location example",
      };
      when(AppointmentService.getAllAppointmentsByClient)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await AppointmentController.getAppointmentsByClient(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual([returnValue]);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/clients/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduledDateTime: null,
        endDateTime: null,
        location: "location example",
      };
      when(AppointmentService.getAllAppointmentsByClient)
        .calledWith(NaN)
        .mockReturnValueOnce(Promise.resolve([returnValue]));

      await AppointmentController.getAppointmentsByClient(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/appointments/clients/1",
        params: {
          id: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.getAllAppointmentsByClient)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.getAppointmentsByClient(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("createAppointment", () => {
    const createBody = {
      user_id: 1,
      client_id: 1,
      description: "description example",
      scheduled_date_time: null,
      end_date_time: null,
      location: "location example",
    };
    const invalidCreateBody = {
      user_id: NaN,
      client_id: NaN,
      description: "description example",
      scheduled_date_time: null,
      end_date_time: null,
      location: "location example",
    };
    it("returns status code `200` if appointment is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/appointments",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        id: 1,
        description: "description example",
        scheduled_date_time: null,
        end_date_time: null,
        location: "location example",
      };
      when(AppointmentService.createAppointment)
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await AppointmentController.createAppointment(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/appointments",
        body: invalidCreateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.createAppointment)
        .calledWith(invalidCreateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.createAppointment(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("updateAppointmentDetails", () => {
    const updateBody = {
      id: 1,
      user_id: 1,
      client_id: 1,
      description: "description example",
      scheduled_date_time: null,
      end_date_time: null,
      location: "location example",
      appointment_id: 1,
      users: {
        id: 1,
        user_name: "username",
        email: "email@mail.com",
        user_password: "password123!",
        user_level_id: 1,
      },
      client: {
        id: 1,
        client_name: "testclient",
        email: "testclient@mail.com",
        company_name: "companyname",
      },
    };
    const invalidUpdateBody = {
      id: NaN,
      user_id: NaN,
      appointment_id: NaN,
      client_id: NaN,
      description: "",
      scheduled_date_time: null,
      end_date_time: null,
      location: "",
      users: {
        id: 1,
        user_name: "username",
        email: "email@mail.com",
        user_password: "password123!",
        user_level_id: 1,
      },

      client: {
        id: 1,
        client_name: "testclient",
        email: "testclient@mail.com",
        company_name: "companyname",
      },
    };
    it("returns status code `200` if appointment is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/appointments",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        appointmentId: 1,
        appointmentName: "John Smith",
        emailAddress: "JohnSmith@example.com",
      };
      when(AppointmentService.updateAppointmentDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await AppointmentController.updateAppointmentDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/appointments",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.updateAppointmentDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.updateAppointmentDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  describe("deleteAppointmentById", () => {
    it("returns status code `200` if appointment is successfully delete", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/appointments",
        body: {
          appointmentId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.deleteAppointmentById).calledWith(request.body)
        .mockResolvedValue;

      await AppointmentController.deleteAppointmentById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an invalid id is passed", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/appointments/NaN",
        params: {
          id: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(AppointmentService.deleteAppointmentById)
        .calledWith(NaN)
        .mockImplementationOnce(() => {
          throw Error("Error getting appointment by id");
        });

      await AppointmentController.deleteAppointmentById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/appointments",
        body: {
          appointmentId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();

      when(await AppointmentService.deleteAppointmentById)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw new Error();
        });

      await AppointmentController.deleteAppointmentById(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
});
