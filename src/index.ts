import App from './server';
import * as http from 'http';
import { DataSource } from "typeorm"

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    connectTimeoutMS:60 * 60 * 1000,
    entities: [
       "src/entity/**/*.ts"
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscriber/**/*.ts"
    ],
    
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


httpServer.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`);
});
