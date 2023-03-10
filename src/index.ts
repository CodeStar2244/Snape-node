import App from './server';
import * as http from 'http';
import { DataSource } from "typeorm";
import * as  path from 'path';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);

export const AppDataSource = new DataSource({
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
       `${path.join(__dirname,"/entities/*.js")}`
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscriber/**/*.ts"
    ],
    
})
console.log(path.join(__dirname,"/entities/*.js"))

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
