interface Appointment {
  id: number;
  description: string;
  scheduled_date_time: Date;
  duration: number;
  location: string;
}

interface IAppointment {
  id: number;
  description: string;
  scheduledDateTime: Date;
  duration: number;
  location: string;
}

interface ICreateAppointment {
  description: string;
  scheduled_date_time: Date;
  duration: number;
  location: string;
}

export { Appointment, IAppointment, ICreateAppointment };
