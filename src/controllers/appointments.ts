import { Request, Response } from "express";
import { AppointmentService } from "../services/appointments";
import { Appointment, ICreateAppointment } from "../interfaces";
import { StatusCodes } from "http-status-codes";
import { isValidId } from "../utils/validation";

async function getAllAppointments(req: Request, res: Response) {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    return res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json("Cannot access database");
  }
}

async function getAppointmentsByUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);
    if (!isValidId(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json("Requires valid userId");
    }
    const appointment = await AppointmentService.getAllAppointmentsByUser(
      userId
    );
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json("Cannot find appointment id");
  }
}

async function getAppointmentsByClient(req: Request, res: Response) {
  try {
    const clientId = parseInt(req.params["id"]);
    if (!isValidId(clientId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid clientId");
    }
    const appointments = await AppointmentService.getAllAppointmentsByClient(
      clientId
    );
    return res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json("Cannot find appointment id");
  }
}

async function getAppointmentById(req: Request, res: Response) {
  try {
    const appointmentId = parseInt(req.params["id"]);
    if (!isValidId(appointmentId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid appointmentId");
    }
    const appointment = await AppointmentService.getAppointmentById(
      appointmentId
    );
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json("Cannot find appointment id");
  }
}

async function updateAppointmentDetails(req: Request, res: Response) {
  try {
    const updateDetails: Appointment = req.body;
    const updatedAppointment =
      await AppointmentService.updateAppointmentDetails(updateDetails);
    return res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json("Could not update appointment.");
  }
}

async function createAppointment(req: Request, res: Response) {
  try {
    const newAppointment: ICreateAppointment = req.body;
    const createdAppointment = await AppointmentService.createAppointment(
      newAppointment
    );
    return res.status(200).json(createdAppointment);
  } catch (error) {
    res.status(500).json("Could not create appointment.");
  }
}

async function deleteAppointmentById(req: Request, res: Response) {
  try {
    const { appointmentId: appointmentId } = req.body;
    if (!isValidId(appointmentId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid appointmentId");
    }
    const deletedAppointment = await AppointmentService.deleteAppointmentById(
      appointmentId
    );

    return res.status(200).json(deletedAppointment);
  } catch (err) {
    return res.status(500).json("Cannot delete id");
  }
}

const AppointmentController = {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUser,
  getAppointmentsByClient,
  createAppointment,
  updateAppointmentDetails,
  deleteAppointmentById,
};

export { AppointmentController };
