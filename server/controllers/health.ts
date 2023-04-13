import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils";

async function getHealth(req: Request, res: Response) {
  const allClients = await prisma.client.findMany();
  return res.status(StatusCodes.OK).json({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    status: "up",
    clients: allClients,
  });
}

export const HealthController = {
  getHealth,
};
