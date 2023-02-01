import { Request, Response } from "express";
import { AppointmentService } from "../services/appointments";
import { Appointment, ICreateAppointment } from "../interfaces";

async function getAllAppointments(req: Request, res: Response) {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    return res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json("Cannot access database");
  }
}

async function getAppointmentsByUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);
    const appointment = await AppointmentService.getAllAppointmentsByUser(
      userId
    );
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(401).json("Cannot find appointment id");
  }
}

async function getAppointmentsByClient(req: Request, res: Response) {
  try {
    const clientId = parseInt(req.params["id"]);
    const appointments = await AppointmentService.getAllAppointmentsByClient(
      clientId
    );
    return res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json("Cannot find appointment id");
  }
}

async function getAppointmentById(req: Request, res: Response) {
  try {
    const appointmentId = parseInt(req.params["id"]);
    const appointment = await AppointmentService.getAppointmentById(
      appointmentId
    );
    return res.status(200).json(appointment);
  } catch (error) {
    res.status(401).json("Cannot find appointment id");
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
  const { appointmentId: appointmentId } = req.body;
  const deletedAppointment = await AppointmentService.deleteAppointmentById(
    appointmentId
  );
  if (!deletedAppointment) {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedAppointment);
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
