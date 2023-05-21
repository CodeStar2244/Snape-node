"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AgentService = void 0;
var db_config_1 = require("../../db/db.config");
var Tblagent_1 = require("../../entities/Tblagent");
var jwt_1 = require("../../helpers/jwt");
var passwordDecryptor_1 = require("../../helpers/passwordDecryptor");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var agentSettings_1 = __importStar(require("../../entities/agentSettings"));
var enterpriseSettings_1 = __importDefault(require("../../entities/enterpriseSettings"));
var AgentService = /** @class */ (function () {
    function AgentService() {
        this.passWordDecrypt = new passwordDecryptor_1.PasswordDecryptor();
    }
    AgentService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, agentSettingsRepo, agent, agentSettings, decryptPassword, userObj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            throw responseBuilder_1.ResponseBuilder.badRequest('Invalid credentials');
                        }
                        return [4 /*yield*/, agentSettingsRepo.findOne({
                                where: {
                                    agentId: {
                                        id: agent.id
                                    }
                                }
                            })];
                    case 2:
                        agentSettings = _a.sent();
                        if (agentSettings.type === agentSettings_1.AgentType.ENTERPRISE) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Enterprise Agents not allowd to Studio Suit.");
                        }
                        decryptPassword = this.passWordDecrypt.decrypt({ encryptedData: agent.password, iv: agent.iv, key: agent.envkey });
                        userObj = {
                            email: agent.email,
                            firstName: agent.firstname,
                            lastName: agent.lastname,
                            id: agent.id,
                            gender: agent.gender,
                            phone: agent.phone
                        };
                        if (decryptPassword !== password) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Invalid credentials");
                        }
                        else {
                            this.generateAgentSettings(agent.id);
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                    token: jwt_1.Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
                                    user: userObj
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.enterpriseLogin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, agentSettingsRepo, agent, agentSettings, decryptPassword, userObj, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            throw responseBuilder_1.ResponseBuilder.badRequest('Invalid credentials');
                        }
                        return [4 /*yield*/, agentSettingsRepo.findOne({
                                where: {
                                    agentId: {
                                        id: agent.id
                                    }
                                }
                            })];
                    case 2:
                        agentSettings = _a.sent();
                        if (agentSettings.type === agentSettings_1.AgentType.STUDIO) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Studio suit Agents not allowd to enterprise.");
                        }
                        decryptPassword = this.passWordDecrypt.decrypt({ encryptedData: agent.password, iv: agent.iv, key: agent.envkey });
                        userObj = {
                            email: agent.email,
                            firstName: agent.firstname,
                            lastName: agent.lastname,
                            id: agent.id,
                            gender: agent.gender,
                            phone: agent.phone
                        };
                        if (decryptPassword !== password) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Invalid credentials");
                        }
                        else {
                            this.generateAgentSettings(agent.id);
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                    token: jwt_1.Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
                                    user: userObj
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.enterpriseRegister = function (enterPriseAgentObjInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, agentSettingRepo, enterpricesettingsRepo, existingAgent, encryptedPassword, enterpriseAgent, enterPriseAgentCreated, agentSettingDetails, enterpricesettings, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (enterPriseAgentObjInfo.confirmPassword !== enterPriseAgentObjInfo.password) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Password Confirmpassword doesn't match")];
                        }
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentSettingRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        enterpricesettingsRepo = db_config_1.AppDataSource.getRepository(enterpriseSettings_1.default);
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    email: enterPriseAgentObjInfo.email
                                }
                            })];
                    case 1:
                        existingAgent = _a.sent();
                        if (existingAgent) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Agent Already exists")];
                        }
                        encryptedPassword = this.passWordDecrypt.encrypt(enterPriseAgentObjInfo.password);
                        return [4 /*yield*/, agentRepo.create({
                                email: enterPriseAgentObjInfo.email,
                                iv: encryptedPassword.iv,
                                password: encryptedPassword.encryptedData,
                                envkey: encryptedPassword.key,
                                firstname: enterPriseAgentObjInfo.name
                            })];
                    case 2:
                        enterpriseAgent = _a.sent();
                        return [4 /*yield*/, agentRepo.save(enterpriseAgent)];
                    case 3:
                        enterPriseAgentCreated = _a.sent();
                        return [4 /*yield*/, agentSettingRepo.create({
                                type: agentSettings_1.AgentType.ENTERPRISE,
                                agentId: enterPriseAgentCreated
                            })];
                    case 4:
                        agentSettingDetails = _a.sent();
                        agentSettingRepo.save(agentSettingDetails);
                        return [4 /*yield*/, enterpricesettingsRepo.create({
                                agentId: enterPriseAgentCreated,
                                userName: enterPriseAgentObjInfo.userName,
                                registrationNumber: enterPriseAgentObjInfo.registrationNumber
                            })];
                    case 5:
                        enterpricesettings = _a.sent();
                        enterpricesettingsRepo.save(enterpricesettings);
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(enterPriseAgentCreated)];
                    case 6:
                        error_3 = _a.sent();
                        throw error_3;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.getRemaningBalance = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentSettingsRepo, agentSettings, dataToSend, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, agentSettingsRepo.createQueryBuilder("agentSettings")
                                .andWhere("agentSettings.agentId = :agentId", { agentId: userDetails.id }).getOne()];
                    case 1:
                        agentSettings = _a.sent();
                        dataToSend = {
                            remainingSpace: (agentSettings.totalStorage - +agentSettings.storage).toFixed(2),
                            usedSpace: +agentSettings.storage.toFixed(2),
                            totalAllowedSpace: agentSettings.totalStorage.toFixed(2)
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.generateAgentSettings = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var agentSettingRepo, agentRepo, agentSetting, agent, agentSettingCreate, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        agentSettingRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        return [4 /*yield*/, agentSettingRepo.findOne({
                                where: {
                                    agentId: {
                                        id: id
                                    }
                                }
                            })];
                    case 1:
                        agentSetting = _a.sent();
                        if (!!agentSetting) return [3 /*break*/, 3];
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        agent = _a.sent();
                        agentSettingCreate = agentSettingRepo.create({
                            storage: 0,
                            assets: 0,
                            agentId: agent
                        });
                        agentSettingRepo.save(agentSettingCreate);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AgentService;
}());
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map