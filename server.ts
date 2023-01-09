import { app } from "./app";
import https from "https";
import fs from "fs";
import { logger } from "./src/utils/logger";

const httpsServer = https.createServer(app);

const PORT = process.env.PORT || 4000;

httpsServer.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
});
