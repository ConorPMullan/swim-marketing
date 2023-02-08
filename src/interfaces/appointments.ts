interface Appointment {
  id: number;
  description: string;
  scheduled_date_time: Date | null;
  duration: number;
  location: string;
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

export { Appointment, IAppointment, ICreateAppointment };
