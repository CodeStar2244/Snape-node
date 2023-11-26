"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var route_1 = require("./route");
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
var i18next_1 = __importDefault(require("i18next"));
var i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
var enterpriseroutes_1 = require("./enterpriseroutes");
var Cron_1 = require("./helpers/Cron");
dotenv_1.default.config();
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        var NODE_ENV = process.env.NODE_ENV;
        this.app = (0, express_1.default)();
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        var i18nObject = i18next_1.default
            .use(i18next_fs_backend_1.default)
            .use(i18next_http_middleware_1.default.LanguageDetector)
            .init({
            initImmediate: false,
            preload: ["en"],
            fallbackLng: "en",
            debug: false,
            backend: {
                loadPath: "src/locales/{{lng}}/translation.json",
            },
        });
        this.app.use(i18next_http_middleware_1.default.handle(i18next_1.default));
        this.app.use(body_parser_1.default.json({ type: "application/vnd.api+json" }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(body_parser_1.default.json(), function (error, req, res, next) {
            if (error) {
                return res.status(400).json({ message: "Json Syntax Error" });
            }
            next();
        });
        var routes = new route_1.Routes(NODE_ENV);
        var enterpriseRoutes = new enterpriseroutes_1.EnterpriseRoutes(NODE_ENV);
        new Cron_1.Cron();
        this.app.all("/*", function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            res.header("Access-Control-Response-Headers", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Accept-Language, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,PATCH");
            if (req.method === "OPTIONS") {
                // res.writeHead(constant.RES_CODE.success);
                res.end();
            }
            else {
                next();
            }
        });
        this.app.use("/api/v1", routes.path());
        this.app.use("/api/v2/enterprise", enterpriseRoutes.path());
        this.app.use(function (err, req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    // logger.error(err);
                    return [2 /*return*/, res.status(err.code).send({
                        // status: constant.RES_STATUS.FAIL, error: err.error
                        })];
                }
                else {
                    next();
                }
                return [2 /*return*/];
            });
        }); });
    }
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=server.js.map