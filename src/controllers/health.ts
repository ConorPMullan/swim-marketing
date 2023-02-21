import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

async function getHealth(req: Request, res: Response) {
  logger.info("healthController");
  return res.status(StatusCodes.OK).json({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    status: "up",
  });
}

export const HealthController = {
  getHealth,
};
