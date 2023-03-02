import { IAppointmentUserClient } from "./appointment";
import { Campaign } from "./campaign";
import { User } from "./user";

export interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

export interface IClientCampaign {
  id: number;
  campaign_id: string;
  client_id: string;
  campaign: Campaign;
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

export interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}
