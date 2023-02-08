import { prisma } from "../utils";
import { IClient, ICreateClient, Client } from "../interfaces";

async function getAllClients() {
  let allClients;
  try {
    allClients = await prisma.client.findMany();
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
  return updateClient;
}

//CREATE function

async function createClient(client: ICreateClient): Promise<string> {
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
    return createdClient.client_name;
  } catch (error) {
    console.log("Error message: ", error);
    throw Error("Cannot create client");
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
    console.log(error);
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
