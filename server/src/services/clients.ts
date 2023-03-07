import { prisma } from "../utils";
import {
  IClient,
  ICreateClient,
  Client,
  ICampaign,
  Campaign,
} from "../interfaces";
import {
  IClientCampaign,
  IClientDetails,
  IUserClient,
} from "../interfaces/clients";
import { logger } from "../utils/logger";
import { IAppointmentUserClient } from "../interfaces/appointments";

async function getAllClients() {
  let allClients;
  try {
    allClients = await prisma.client.findMany();
  } catch (error) {
    throw Error("Cannot get clients", error);
  }
  const clients: IClient[] =
    allClients?.map(
      (x: {
        id: number;
        client_name: string;
        email: string;
        company_name: string;
      }) => ({
        clientId: x.id,
        clientName: x.client_name,
        emailAddress: x.email,
        companyName: x.company_name,
      })
    ) || [];
  const filteredClients = clients.filter(
    (client) => client.clientName !== "DELETEDCLIENT"
  );

  return filteredClients;
}

async function getClientDetails(clientId: number): Promise<IClientDetails> {
  let clientObject;

  try {
    clientObject = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        appointment_user_client: {
          include: { appointment: true },
        },
        user_client: {
          include: { users: true },
        },
      },
    });
  } catch (error) {
    throw Error("Cannot get client by id", error);
  }
  const clientCampaigns = clientObject.campaigns?.filter((clientObj) => {
    clientObj.campaign_name !== "DELETEDCAMPAIGN";
  });

  const returnedValue: {
    clientId: number;
    clientName: string;
    emailAddress: string;
    companyName: string;
    appointments: IAppointmentUserClient;
    campaigns: Campaign[];
    users: IUserClient;
  } = {
    clientId: clientObject.id,
    clientName: clientObject.client_name,
    emailAddress: clientObject.email,
    companyName: clientObject.company_name,
    appointments: clientObject.appointment_user_client,
    campaigns: clientCampaigns,
    users: clientObject.user_client[0],
  };

  return returnedValue;
}

async function getClientById(clientId: number): Promise<IClient> {
  let clientObject;
  await getClientDetails(clientId);
  try {
    clientObject = await prisma.client.findUnique({
      where: { id: clientId },
    });
  } catch (error) {
    throw Error("Cannot get client by id", error);
  }

  const returnedValue = {
    clientId: clientObject.id,
    clientName: clientObject.client_name,
    emailAddress: clientObject.email,
    companyName: clientObject.company_name,
  };
  return returnedValue;
}

async function getClientsByUserId(userId: number): Promise<IClient[]> {
  let clientsByUserId;

  try {
    clientsByUserId = await prisma.user_client.findMany({
      where: { user_id: userId },
      include: { client: true },
    });
  } catch (error) {
    throw Error("Cannot get client by user id", error);
  }
  const clients: IClient[] =
    clientsByUserId?.map(
      (x: {
        id: number;
        client_name: string;
        email: string;
        company_name: string;
      }) => ({
        clientId: x.id,
        clientName: x.client_name,
        emailAddress: x.email,
        companyName: x.company_name,
      })
    ) || [];

  return clients;
}

//UPDATE functions

async function updateClientDetails(client: IClientDetails) {
  let updateClient;
  try {
    updateClient = await prisma.client.update({
      where: {
        id: client.clientId,
      },
      data: {
        client_name: client.clientName,
        email: client.emailAddress,
        company_name: client.companyName,
      },
    });
    await prisma.user_client.updateMany({
      where: { client_id: client.clientId },
      data: { user_id: client.users.user_id },
    });
  } catch (error) {
    throw Error("Cannot update client", error);
  }
  return updateClient;
}

//CREATE function

async function createClient(client: ICreateClient): Promise<Client> {
  try {
    const newClient = await prisma.client.create({
      data: {
        client_name: client.client_name,
        email: client.email,
        company_name: client.company_name,
      },
    });

    const createdClient = {
      id: newClient.id,
      client_name: newClient.client_name,
      email: newClient.email,
      company_name: newClient.company_name,
    };

    await prisma.user_client.create({
      data: {
        user_id: client.user_id,
        client_id: newClient.id,
      },
    });

    return createdClient;
  } catch (error) {
    throw Error("Cannot create client", error);
  }
}

async function deleteClientById(clientId: number) {
  let deletedClient;
  try {
    deletedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        client_name: "DELETEDCLIENT",
        email: "DELETED",
        company_name: "DELETEDCOMPANY",
      },
    });
  } catch (error) {
    throw Error("Cannot delete client", error);
  }
  return deletedClient;
}

const ClientService = {
  getAllClients,
  getClientById,
  getClientDetails,
  getClientsByUserId,
  createClient,
  updateClientDetails,
  deleteClientById,
};

export { ClientService };
