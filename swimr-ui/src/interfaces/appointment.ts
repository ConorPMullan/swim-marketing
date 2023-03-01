export interface Appointment {
  id: number;
  scheduled_date_time: string;
  duration: number;
  description: string;
  location: string;
}

export interface IAppointment {
  id: number;
  appointment: Appointment;
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
    user_password: string;
    user_level_id: number;
  };
}

export interface Clients {
  client_id: number;
  client_name: string;
  company_name: string;
  email_address: string;
}

export interface Users {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
  user_level_id: number;
}
export interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  location: string;
  clients: Clients;
  users: Users;
}

export interface IAppointmentUserClient {
  id: number;
  user_id: number;
  client_id: number;
  appointment_id: number;
  appointment: Appointment;
}
