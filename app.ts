import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Helmet from "helmet";
import { HealthRouter } from "./src/routers/health";
import { UserRouter } from "./src/routers/users";
import { ClientRouter } from "./src/routers/clients";
import { CampaignRouter } from "./src/routers/campaigns";
import { InfluencerRouter } from "./src/routers/influencers";
import { AppointmentRouter } from "./src/routers/appointments";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

/* initialise Express app */
const app = express();

/* setup middleware */
app.use(cors());
app.use(
  Helmet.hsts({
    maxAge: 5184000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", HealthRouter);
app.use("/api/health", HealthRouter);
app.use("/api/users", UserRouter);
app.use("/api/clients", ClientRouter);
app.use("/api/campaigns", CampaignRouter);
app.use("/api/influencers", InfluencerRouter);
app.use("/api/appointments", AppointmentRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* error handling */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  }

  return next();
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app };
