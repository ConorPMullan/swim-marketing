import { prisma } from "../utils";
import { IAppointment, ICreateAppointment, Appointment } from "../interfaces";
import { IUpdateAppointment } from "../interfaces/appointments";

async function getAllAppointments() {
  let allAppointments;
  try {
    allAppointments = await prisma.appointment_user_client.findMany({
      include: {
        appointment: true,
        client: true,
        users: true,
      },
    });
  } catch (error) {
    throw new Error("Cannot get appointments", error);
  }

  const appointments =
    allAppointments
      ?.filter((a) => a.appointment.description !== "DELETEDAPPOINTMENT")
      .map(
        (x: {
          id: number;
          user_id: number;
          client_id: number;
          appointment: {
            id: number;
            description: string;
            scheduled_date_time: Date;
            end_date_time: Date;
            location: string;
          };
          client: {
            id: number;
            client_name: string;
            email: string;
            company_name: string;
          };
          users: {
            id: number;
            user_name: string;
            email: string;
            user_level_id: number;
          };
        }) => ({
          id: x.id,
          appointment: {
            id: x.appointment.id,
            description: x.appointment.description,
            scheduled_date_time: x.appointment.scheduled_date_time,
            end_date_time: x.appointment.end_date_time,
            location: x.appointment.location,
          },
          client: {
            id: x.client.id,
            client_name: x.client.client_name,
            email: x.client.email,
            company_name: x.client.company_name,
          },
          users: {
            id: x.users.id,
            user_name: x.users.user_name,
            email: x.users.email,
            user_level_id: x.users.user_level_id,
          },
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
    throw new Error("Cannot get appointment by id ", error);
  }

  const returnedValue = {
    id: appointmentObject.id,
    description: appointmentObject.description,
    scheduledDateTime: appointmentObject.scheduled_date_time,
    endDateTime: appointmentObject.end_date_time,
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
    throw new Error("Cannot get appointments by user id", error);
  }
  const appointments: IAppointment[] =
    allAppointments
      ?.filter((a) => a.appointment.description !== "DELETEDAPPOINTMENT")
      .map(
        (x: {
          id: number;
          user_id: number;
          client_id: number;
          appointment_id: number;
          appointment: {
            id: number;
            scheduled_date_time: Date;
            end_date_time: Date;
            description: string;
            location: string;
          };
        }) => ({
          id: x.appointment.id,
          description: x.appointment.description,
          scheduledDateTime: x.appointment.scheduled_date_time,
          endDateTime: x.appointment.end_date_time,
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
    throw new Error("Cannot get appointments by client id", error);
  }

  const appointments: IAppointment[] =
    allAppointments
      ?.filter((a) => a.appointment.description !== "DELETEDAPPOINTMENT")
      .map(
        (x: {
          id: number;
          user_id: number;
          client_id: number;
          appointment_id: number;
          appointment: {
            id: number;
            scheduled_date_time: Date;
            end_date_time: Date;
            description: string;
            location: string;
          };
        }) => ({
          id: x.appointment.id,
          description: x.appointment.description,
          scheduledDateTime: x.appointment.scheduled_date_time,
          endDateTime: x.appointment.end_date_time,
          location: x.appointment.location,
        })
      ) || [];
  return appointments;
}

//UPDATE functions

async function updateAppointmentDetails(appointment: IUpdateAppointment) {
  let updateAppointment;
  try {
    updateAppointment = await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        description: appointment.description,
        scheduled_date_time: appointment.scheduled_date_time,
        end_date_time: appointment.end_date_time,
        location: appointment.location,
      },
    });
    await prisma.appointment_user_client.update({
      where: {
        id: appointment.id,
      },
      data: {
        user_id: appointment.users.id,
        client_id: appointment.client.id,
      },
    });
  } catch (error) {
    throw new Error("Cannot update appointment", error);
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
        end_date_time: appointment.scheduled_date_time,
        location: appointment.location,
      },
    });

    const createdAppointment = {
      id: newAppointment.id,
      description: newAppointment.description,
      scheduled_date_time: newAppointment.scheduled_date_time,
      end_date_time: newAppointment.end_date_time,
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
    throw Error("Cannot create appointment", error);
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
        scheduled_date_time: null,
        end_date_time: null,
        location: "DELETEDAPPOINTMENT",
      },
    });
  } catch (error) {
    throw new Error("Cannot delete appointment", error);
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
