import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Helmet from "helmet";
import { HealthRouter } from "./src/routers/health";
import { UserRouter } from "./src/routers/users";

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
app.use("/health", HealthRouter);
app.use("/user", UserRouter);

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
