import express from "express";
import { HealthController } from "../controllers/health";

const HealthRouter = express.Router();

HealthRouter.get("/health", HealthController.getHealth);

export { HealthRouter };
