interface Appointment {
  id: number;
  description: string;
  scheduled_date_time: Date | null;
  duration: number;
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
  duration: number;
  location: string;
}

interface ICreateAppointment {
  description: string;
  scheduled_date_time: Date | null;
  duration: number;
  location: string;
  user_id: number;
  client_id: number;
}

export {
  Appointment,
  IAppointment,
  ICreateAppointment,
  IAppointmentUserClient,
};
