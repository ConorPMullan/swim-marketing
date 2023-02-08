import { prisma } from "../utils";
import { IAppointment, ICreateAppointment, Appointment } from "../interfaces";

async function getAllAppointments() {
  let allAppointments;
  try {
    allAppointments = await prisma.appointment.findMany();
  } catch (error) {
    throw new Error("Cannot get appointments");
  }
  const appointments: IAppointment[] =
    allAppointments?.map(
      (x: {
        id: number;
        description: string;
        scheduled_date_time: Date;
        duration: number;
        location: string;
      }) => ({
        id: x.id,
        description: x.description,
        scheduledDateTime: x.scheduled_date_time,
        duration: x.duration,
        location: x.location,
      })
    ) || [];
  return appointments;
}

async function getAppointmentById(
  appointmentId: number
): Promise<IAppointment> {
  let appointmentObject;

  try {
    appointmentObject = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
  } catch (error) {
    throw new Error("Cannot get appointment by id ");
  }

  const returnedValue = {
    id: appointmentObject.id,
    description: appointmentObject.description,
    scheduledDateTime: appointmentObject.scheduled_date_time,
    duration: appointmentObject.duration,
    location: appointmentObject.location,
  };
  return returnedValue;
}

async function getAllAppointmentsByUser(userId: number) {
  let allAppointments;
  try {
    allAppointments = await prisma.appointment_user_client.findMany({
      where: { user_id: userId },
      include: { appointment: true },
    });
  } catch (error) {
    throw new Error("Cannot get appointments by user id");
  }
  const appointments: IAppointment[] =
    allAppointments?.map(
      (x: {
        id: number;
        user_id: number;
        client_id: number;
        appointment_id: number;
        appointment: {
          id: number;
          scheduled_date_time: Date;
          duration: number;
          description: string;
          location: string;
        };
      }) => ({
        id: x.appointment.id,
        description: x.appointment.description,
        scheduledDateTime: x.appointment.scheduled_date_time,
        duration: x.appointment.duration,
        location: x.appointment.location,
      })
    ) || [];
  return appointments;
}

async function getAllAppointmentsByClient(clientId: number) {
  let allAppointments;
  try {
    allAppointments = await prisma.appointment_user_client.findMany({
      where: { client_id: clientId },
      include: { appointment: true },
    });
  } catch (error) {
    throw new Error("Cannot get appointments by client id");
  }

  const appointments: IAppointment[] =
    allAppointments?.map(
      (x: {
        id: number;
        user_id: number;
        client_id: number;
        appointment_id: number;
        appointment: {
          id: number;
          scheduled_date_time: Date;
          duration: number;
          description: string;
          location: string;
        };
      }) => ({
        id: x.appointment.id,
        description: x.appointment.description,
        scheduledDateTime: x.appointment.scheduled_date_time,
        duration: x.appointment.duration,
        location: x.appointment.location,
      })
    ) || [];
  return appointments;
}

//UPDATE functions

async function updateAppointmentDetails(appointment: Appointment) {
  let updateAppointment;
  try {
    updateAppointment = await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        description: appointment.description,
        scheduled_date_time: appointment.scheduled_date_time,
        duration: appointment.duration,
        location: appointment.location,
      },
    });
  } catch (error) {
    throw new Error("Cannot update appointment");
  }
  return updateAppointment;
}

//CREATE function

async function createAppointment(
  appointment: ICreateAppointment
): Promise<Appointment> {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        description: appointment.description,
        scheduled_date_time: appointment.scheduled_date_time,
        duration: appointment.duration,
        location: appointment.location,
      },
    });

    const createdAppointment = {
      id: newAppointment.id,
      description: newAppointment.description,
      scheduled_date_time: newAppointment.scheduled_date_time,
      duration: newAppointment.duration,
      location: newAppointment.location,
    };

    await prisma.appointment_user_client.create({
      data: {
        user_id: appointment.user_id,
        client_id: appointment.client_id,
        appointment_id: newAppointment.id,
      },
    });
    return createdAppointment;
  } catch (error) {
    throw Error("Cannot create appointment");
  }
}

async function deleteAppointmentById(appointmentId: number) {
  let deletedAppointment;
  try {
    deletedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        description: "DELETEDAPPOINTMENT",
        scheduled_date_time: "DELETEDAPPOINTMENT",
        duration: 0,
        location: "DELETEDAPPOINTMENT",
      },
    });
  } catch (error) {
    throw new Error("Cannot delete appointment");
  }
  return deletedAppointment;
}

const AppointmentService = {
  getAllAppointments,
  getAppointmentById,
  getAllAppointmentsByUser,
  getAllAppointmentsByClient,
  createAppointment,
  updateAppointmentDetails,
  deleteAppointmentById,
};

export { AppointmentService };
