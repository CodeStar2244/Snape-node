"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(path_1.default.join(__dirname, "../entities/*.js"), '----s--------');
var Tblagent_1 = require("entities/Tblagent");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    connectTimeoutMS: 60 * 60 * 1000,
    migrationsTableName: "migration_info_table",
    entities: [Tblagent_1.Tblagent],
    migrations: [
        "".concat(path_1.default.join(__dirname, "..\migration\*.js"))
    ],
    subscribers: [
        "src\subscriber\**\*.ts"
    ],
});
//# sourceMappingURL=db.config.js.map