import App from "./server";
import * as http from "http";
import { DataSource } from "typeorm";
import { Log } from "./helpers/logger";
import { AppDataSource } from "./db/db.config";
import { Utils } from "./utils/utils";
import { Cron } from "./helpers/Cron";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);
const logger = new Log();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    new Cron();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

httpServer.listen(PORT, () => {
  logger.info(`Server is listing on port ${PORT}`);
});
