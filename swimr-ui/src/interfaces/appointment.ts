export interface Appointment {
  id: number;
  scheduled_date_time: Date;
  end_date_time: Date;
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
    user_level_id: number;
  };
}

export interface IUpdateAppointment {
  id: number;
  scheduled_date_time: Date;
  appointment_id: number;
  end_date_time: Date;
  description: string;
  location: string;
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
}

export interface Clients {
  id: number;
  client_name: string;
  company_name: string;
  email: string;
}

export interface Users {
  id: number;
  user_name: string;
  email: string;
  user_level_id: number;
}
export interface IEvent {
  id: number;
  appointment_id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  location: string;
  client: Clients;
  users: Users;
}

export interface ICreateAppointment {
  description: string;
  scheduled_date_time: Date;
  end_date_time: Date;
  location: string;
  user_id: number;
  client_id: number;
}

export interface IAppointmentForm {
  selectedAppointment: IEvent | undefined;
  modalType: string;
  handleSubmit: (values: IEvent) => void;
  handleClose: () => void;
}

export interface IAppointmentUserClient {
  id: number;
  user_id: number;
  client_id: number;
  appointment_id: number;
  appointment: Appointment;
}

export interface IAppointmentModalProps {
  handleClose: () => void;
  selectedAppointment: IEvent | undefined;
  modalType: string;
}
