import { IAppointmentUserClient } from "./appointments";
import { Campaign } from "./campaigns";
import { User } from "./users";

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

interface IUserClient {
  id: number;
  client_id: number;
  user_id: number;
  users: User;
}

interface IClientDetails {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
  appointments: IAppointmentUserClient;
  campaigns: IClientCampaign;
  users: IUserClient;
}

interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}

export {
  Client,
  IClient,
  ICreateClient,
  IClientDetails,
  IClientCampaign,
  IUserClient,
};
