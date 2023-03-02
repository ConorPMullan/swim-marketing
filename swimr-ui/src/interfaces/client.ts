import { IAppointmentUserClient } from "./appointment";
import { Campaign } from "./campaign";

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
export interface IClientDetails {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
  appointments: IAppointmentUserClient[][];
  campaigns: IClientCampaign[][];
}

export interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}
