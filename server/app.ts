import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Helmet from "helmet";
import { HealthRouter } from "./routers/health";
import { UserRouter } from "./routers/users";
import { AuthenticationRouter } from "./routers/authentication";
import { ClientRouter } from "./routers/clients";
import { CampaignRouter } from "./routers/campaigns";
import { InfluencerRouter } from "./routers/influencers";
import { AppointmentRouter } from "./routers/appointments";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { verifyToken } from "./middleware/authentication";
import { authorise } from "./middleware/authorisation";
import bodyParser from "body-parser";
import { SignUpRouter } from "./routers/sign-up";

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Swimr Marketing API Documentation",
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
    {
      url: "https://swimr-service-1.en4hm7oenec5e.eu-west-1.cs.amazonlightsail.com",
      description: "Lightsail server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api/signup", SignUpRouter);

//Unauthenticated Routes
app.use("/", HealthRouter);
app.use("/api", HealthRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(swaggerSpec).status(200)
);

//Authentication
app.all("*", verifyToken);
app.all("*", authorise);

//Authenticated Routes
app.use("/api/users", UserRouter);
app.use("/api/clients", ClientRouter);
app.use("/api/campaigns", CampaignRouter);
app.use("/api/influencers", InfluencerRouter);
app.use("/api/appointments", AppointmentRouter);
app.use("/api/authenticate", AuthenticationRouter);

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

export { app };
