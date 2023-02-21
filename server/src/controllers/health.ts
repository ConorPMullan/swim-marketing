import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function getHealth(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    status: "up",
  });
}

export const HealthController = {
  getHealth,
};
