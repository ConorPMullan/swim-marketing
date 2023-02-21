import { prisma } from "../utils";
import { IClient, ICreateClient, Client } from "../interfaces";

async function getAllClients() {
  let allClients;
  try {
    allClients = await prisma.client.findMany();
  } catch (error) {
    throw Error("Cannot get clients", error);
  }
  const clients: IClient[] =
    allClients?.map(
      (x: { id: number; client_name: string; email: string }) => ({
        clientId: x.id,
        clientName: x.client_name,
        emailAddress: x.email,
      })
    ) || [];
  return clients;
}

async function getClientById(clientId: number): Promise<IClient> {
  let clientObject;

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
      (x: { id: number; client_name: string; email: string }) => ({
        clientId: x.id,
        clientName: x.client_name,
        emailAddress: x.email,
      })
    ) || [];

  return clients;
}

//UPDATE functions

async function updateClientDetails(client: Client) {
  let updateClient;
  try {
    updateClient = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        client_name: client.client_name,
        email: client.email,
      },
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
      },
    });

    const createdClient = {
      id: newClient.id,
      client_name: newClient.client_name,
      email: newClient.email,
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
  getClientsByUserId,
  createClient,
  updateClientDetails,
  deleteClientById,
};

export { ClientService };
