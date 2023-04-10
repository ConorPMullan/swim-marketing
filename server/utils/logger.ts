import { createLogger, format, transports } from "winston";
const { combine, timestamp, errors, json } = format;

export const logger = createLogger({
  format: combine(errors({ stack: true }), timestamp(), json()),
  defaultMeta: { service: "swimr" },
  transports: [new transports.Console()],
});
