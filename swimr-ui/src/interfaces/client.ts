import { IAppointmentUserClient } from "./appointment";
import { Campaign } from "./campaign";
import { User } from "./user";

export interface Client {
  id: number;
  client_name: string;
  company_name: string;
  email: string;
}

export interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

export interface IClientCampaign {
  id: number;
  campaign_id: number;
  client_id: number;
  campaign?: Campaign;
  client?: Client;
}

interface IUserClient {
  id: number;
  client_id: number;
  user_id: number;
  users: User;
}
export interface IClientDetails {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
  appointments: IAppointmentUserClient[];
  campaigns: IClientCampaign[];
  users: IUserClient;
}

export interface IClientModalProps {
  handleClose: () => void;
  selectedClient: IClientDetails | undefined;
  modalType: string;
}
export interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}
