import { Client } from "./clients";
import { User } from "./users";

interface Appointment {
  id: number;
  description: string;
  scheduled_date_time: Date | null;
  end_date_time: Date | null;
  location: string;
}

interface IAppointmentUserClient {
  id: number;
  user_id: number;
  client_id: number;
  appointment_id: number;
  appointment: Appointment[];
}

interface IAppointment {
  id: number;
  description: string;
  scheduledDateTime: Date | null;
  endDateTime: Date | null;
  location: string;
}

interface ICreateAppointment {
  description: string;
  scheduled_date_time: Date | null;
  end_date_time: Date | null;
  location: string;
  user_id: number;
  client_id: number;
}

interface IUpdateAppointment {
  id: number;
  description: string;
  scheduled_date_time: Date | null;
  end_date_time: Date | null;
  location: string;
  appointment_id: number;
  users: User;
  client: Client;
}

export {
  Appointment,
  IAppointment,
  ICreateAppointment,
  IAppointmentUserClient,
  IUpdateAppointment,
};
