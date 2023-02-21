import express from "express";
import { HealthController } from "../controllers/health";
import { logger } from "../utils/logger";

const HealthRouter = express.Router();
logger.info("HealthRouter");
HealthRouter.get("/health", HealthController.getHealth);

export { HealthRouter };
