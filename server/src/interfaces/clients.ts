import { IAppointmentUserClient } from "./appointments";
import { Campaign } from "./campaigns";

interface Client {
  id: number;
  client_name: string;
  email: string;
  company_name: string;
}

interface IClient {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
}

interface IClientCampaign {
  id: number;
  campaign_id: string;
  client_id: string;
  campaign: Campaign[];
}

interface IClientDetails {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
  appointments: IAppointmentUserClient[];
  campaigns: IClientCampaign[];
}

interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}

export { Client, IClient, ICreateClient, IClientDetails };
