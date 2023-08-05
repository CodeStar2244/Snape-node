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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var lodash_1 = require("lodash");
// import { TABLES } from "./config/tables";
var jwt_1 = require("./helpers/jwt");
var logger_1 = require("./helpers/logger");
var Tblagent_1 = require("./entities/Tblagent");
var db_config_1 = require("./db/db.config");
var enterPriseClient_1 = require("./entities/enterPriseClient");
var Middleware = /** @class */ (function () {
    function Middleware() {
        var _this = this;
        this.logger = new logger_1.Log();
        this.authenticateUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var unAuthPayload, token, tokenInfo, agentRepo, agent, userObj, error_1, unAuthPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        unAuthPayload = {
                            error: {
                                message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
                                code: 401,
                                status: false,
                            },
                        };
                        if (!!(0, lodash_1.isEmpty)(req.headers.authorization)) return [3 /*break*/, 2];
                        token = req.headers.authorization;
                        tokenInfo = jwt_1.Jwt.decodeAuthToken(token).payload;
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        return [4 /*yield*/, agentRepo.findOneBy({ id: tokenInfo.agentId })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            unAuthPayload.error.message = req.i18n.t("USER_NOT_EXIST");
                            unAuthPayload.error.code = 404;
                            return [2 /*return*/, res.status(unAuthPayload.error.code).send(unAuthPayload.error)];
                        }
                        if (!agent.isactive) {
                            unAuthPayload.error.message = req.i18n.t("ERR_ACCESS_REMOVED");
                            unAuthPayload.error.code = 401;
                            return [2 /*return*/, res.status(unAuthPayload.error.code).send(unAuthPayload.error)];
                        }
                        userObj = {
                            email: agent.email,
                            id: agent.id,
                            firstName: agent.firstname,
                            lastName: agent.lastname
                        };
                        req.user = userObj;
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
                        res.status(401).send(unAuthPayload.error);
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        unAuthPayload = {
                            error: {
                                message: req.i18n.t("ERR_UNAUTH"),
                                code: 401,
                                status: false,
                            },
                        };
                        if (error_1.name === "TokenExpiredError") {
                            return [2 /*return*/, res.status(401).send(unAuthPayload.error)];
                        }
                        else {
                            console.log(error_1);
                            unAuthPayload.error.message = req.i18n.t("ERR_INVALID_TOKEN");
                            return [2 /*return*/, res.status(401).send(unAuthPayload.error)];
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.authenticateEnterpriseUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var unAuthPayload, token, tokenInfo, enterpriseRepo, enterpriseUser, userObj, error_2, unAuthPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        unAuthPayload = {
                            error: {
                                message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
                                code: 401,
                                status: false,
                            },
                        };
                        if (!!(0, lodash_1.isEmpty)(req.headers.authorization)) return [3 /*break*/, 2];
                        token = req.headers.authorization;
                        tokenInfo = jwt_1.Jwt.decodeAuthToken(token).payload;
                        enterpriseRepo = db_config_1.AppDataSource.getRepository(enterPriseClient_1.EnterPriseClient);
                        return [4 /*yield*/, enterpriseRepo.findOneBy({ id: tokenInfo.clientId })];
                    case 1:
                        enterpriseUser = _a.sent();
                        if (!enterpriseUser) {
                            unAuthPayload.error.message = req.i18n.t("USER_NOT_EXIST");
                            unAuthPayload.error.code = 404;
                            return [2 /*return*/, res.status(unAuthPayload.error.code).send(unAuthPayload.error)];
                        }
                        if (!enterpriseUser.isactive) {
                            unAuthPayload.error.message = req.i18n.t("ERR_ACCESS_REMOVED");
                            unAuthPayload.error.code = 401;
                            return [2 /*return*/, res.status(unAuthPayload.error.code).send(unAuthPayload.error)];
                        }
                        userObj = {
                            email: enterpriseUser.email,
                            id: enterpriseUser.id,
                            name: enterpriseUser.name
                        };
                        req.user = userObj;
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
                        res.status(401).send(unAuthPayload.error);
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        unAuthPayload = {
                            error: {
                                message: req.i18n.t("ERR_UNAUTH"),
                                code: 401,
                                status: false,
                            },
                        };
                        if (error_2.name === "TokenExpiredError") {
                            return [2 /*return*/, res.status(401).send(unAuthPayload.error)];
                        }
                        else {
                            console.log(error_2);
                            unAuthPayload.error.message = req.i18n.t("ERR_INVALID_TOKEN");
                            return [2 /*return*/, res.status(401).send(unAuthPayload.error)];
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return Middleware;
}());
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map