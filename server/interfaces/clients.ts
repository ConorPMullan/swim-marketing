import { IAppointmentUserClient } from "./appointments";
import { Campaign } from "./campaigns";
import { IUpdateUser, User } from "./users";

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
  campaign_id: number;
  client_id: number;
  campaign: Campaign[];
}

interface IUserClient {
  id: number;
  client_id: number;
  user_id: number;
  users: IUpdateUser;
}

interface IClientDetails {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
  appointments: IAppointmentUserClient;
  campaigns: Campaign[];
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
