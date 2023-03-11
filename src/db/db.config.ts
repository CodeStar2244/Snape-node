import { DataSource } from "typeorm";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
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
    migrationsTableName:"migration_info_table",
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