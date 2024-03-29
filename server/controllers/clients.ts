import { Request, Response } from "express";
import { ClientService } from "../services/clients";
import { Client, ICreateClient } from "../interfaces";
import { isValidId } from "../utils/validation";
import { StatusCodes } from "http-status-codes";
import { IClientDetails } from "../interfaces/clients";

async function getAllClients(req: Request, res: Response) {
  try {
    const clients = await ClientService.getAllClients();
    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json("Cannot access database");
  }
}

async function getClientsByUserId(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);
    if (!isValidId(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json("Requires valid userId");
    }
    const clients = await ClientService.getClientsByUserId(userId);
    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).json("Cannot access database");
  }
}

async function getClientById(req: Request, res: Response) {
  try {
    const clientId = parseInt(req.params["id"]);
    if (!isValidId(clientId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid clientId");
    }
    const client = await ClientService.getClientById(clientId);
    return res.status(200).json(client);
  } catch (error) {
    res.status(500).json("Cannot find client id");
  }
}

async function getClientDetails(req: Request, res: Response) {
  try {
    const clientId = parseInt(req.params["id"]);
    if (!isValidId(clientId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid clientId");
    }
    const client = await ClientService.getClientDetails(clientId);
    return res.status(200).json(client);
  } catch (error) {
    res.status(500).json("Cannot find client id");
  }
}

async function updateClientDetails(req: Request, res: Response) {
  try {
    const updateDetails: IClientDetails = req.body;
    const updatedClient = await ClientService.updateClientDetails(
      updateDetails
    );
    return res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json("Could not update client.");
  }
}

async function createClient(req: Request, res: Response) {
  try {
    const newClient: ICreateClient = req.body;
    const createdClient = await ClientService.createClient(newClient);
    return res.status(200).json(createdClient);
  } catch (error) {
    res.status(500).json("Could not create client.");
  }
}

async function deleteClientById(req: Request, res: Response) {
  try {
    const { clientId: clientId } = req.body;
    if (!isValidId(clientId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Requires valid clientId");
    }
    const deletedClient = await ClientService.deleteClientById(clientId);
    return res.status(200).json(deletedClient);
  } catch (error) {
    return res.status(500).json("Cannot delete id");
  }
}

const ClientController = {
  getAllClients,
  getClientById,
  getClientDetails,
  getClientsByUserId,
  createClient,
  updateClientDetails,
  deleteClientById,
};

export { ClientController };
