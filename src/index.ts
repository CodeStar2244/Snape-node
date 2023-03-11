import App from './server';
import * as http from 'http';
import { DataSource } from "typeorm";
import { Log } from './helpers/logger';
import { AppDataSource } from './db/db.config';


const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);
const logger = new Log();



AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


httpServer.listen(PORT, () => {
    logger.info(`Server is listing on port ${PORT}`);
});
