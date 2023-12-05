"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var agentSettings_1 = __importDefault(require("../../entities/agentSettings"));
var Tblimages_1 = require("../../entities/Tblimages");
var plans_1 = __importDefault(require("../../entities/plans"));
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
                                    email: email,
                                },
                            })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Invalid credentials");
                        }
                        return [4 /*yield*/, agentSettingsRepo.findOne({
                                where: {
                                    agentId: {
                                        id: agent.id,
                                    },
                                },
                            })];
                    case 2:
                        agentSettings = _a.sent();
                        decryptPassword = this.passWordDecrypt.decrypt({
                            encryptedData: agent.password,
                            iv: agent.iv,
                            key: agent.envkey,
                        });
                        userObj = {
                            email: agent.email,
                            firstName: agent.firstname,
                            lastName: agent.lastname,
                            id: agent.id,
                            gender: agent.gender,
                            phone: agent.phone,
                        };
                        if (decryptPassword !== password) {
                            throw responseBuilder_1.ResponseBuilder.badRequest("Invalid credentials");
                        }
                        else {
                            this.generateAgentSettings(agent.id);
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                    token: jwt_1.Jwt.getAuthToken({ email: agent.email, agentId: agent.id }),
                                    user: userObj,
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1, "------error----");
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.getRemaningBalance = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentSettingsRepo, agentSettings, dataToSend, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, agentSettingsRepo
                                .createQueryBuilder("agentSettings")
                                .andWhere("agentSettings.agentId = :agentId", {
                                agentId: userDetails.id,
                            })
                                .getOne()];
                    case 1:
                        agentSettings = _a.sent();
                        dataToSend = {
                            remainingSpace: (agentSettings.totalStorage - +agentSettings.storage).toFixed(2),
                            usedSpace: +agentSettings.storage.toFixed(2),
                            totalAllowedSpace: agentSettings.totalStorage.toFixed(2),
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.getAgentProfile = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, imageRepo, agent, profileImage, agentToSend, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        imageRepo = db_config_1.AppDataSource.getRepository(Tblimages_1.Tblimages);
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    id: userDetails.id,
                                },
                                select: [
                                    "bio",
                                    "id",
                                    "firstname",
                                    "lastname",
                                    "email",
                                    "phone",
                                    "gender",
                                    "location",
                                    "timezone",
                                    "businessName",
                                ],
                            })];
                    case 1:
                        agent = _a.sent();
                        return [4 /*yield*/, imageRepo.findOne({
                                where: {
                                    entityid: agent.id,
                                    entitytype: "agent",
                                },
                            })];
                    case 2:
                        profileImage = _a.sent();
                        agentToSend = __assign(__assign({}, agent), { profile: profileImage === null || profileImage === void 0 ? void 0 : profileImage.imagepath });
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(agentToSend)];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3, "Error");
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AgentService.prototype.updateAgentProfile = function (userDetails, body) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, agent, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    id: userDetails.id,
                                },
                                select: ["id", "firstname", "lastname"],
                            })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Agent Not found")];
                        }
                        return [4 /*yield*/, agentRepo.update(agent.id, {
                                bio: body.bio,
                                location: body.location,
                                timezone: body.timezone,
                                firstname: body.firstname,
                                lastname: body.lastname,
                                businessName: body.businessName,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(agent)];
                    case 3:
                        error_4 = _a.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
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
                                        id: id,
                                    },
                                },
                            })];
                    case 1:
                        agentSetting = _a.sent();
                        if (!!agentSetting) return [3 /*break*/, 3];
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    id: id,
                                },
                            })];
                    case 2:
                        agent = _a.sent();
                        agentSettingCreate = agentSettingRepo.create({
                            storage: 0,
                            assets: 0,
                            agentId: agent,
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
    AgentService.prototype.getPlans = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var planRepo, agentSettingsRepo, plans, agentActivatedPlan, plansToSend, _i, plansToSend_1, plan, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        planRepo = db_config_1.AppDataSource.getRepository(plans_1.default);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, planRepo.find({
                                order: {
                                    id: "ASC"
                                }
                            })];
                    case 1:
                        plans = _a.sent();
                        return [4 /*yield*/, agentSettingsRepo.findOne({
                                where: {
                                    agentId: userDetails === null || userDetails === void 0 ? void 0 : userDetails.id
                                },
                                relations: ["currentPlan"]
                            })];
                    case 2:
                        agentActivatedPlan = _a.sent();
                        plansToSend = JSON.parse(JSON.stringify(plans));
                        for (_i = 0, plansToSend_1 = plansToSend; _i < plansToSend_1.length; _i++) {
                            plan = plansToSend_1[_i];
                            if ((plan === null || plan === void 0 ? void 0 : plan.id) === (agentActivatedPlan === null || agentActivatedPlan === void 0 ? void 0 : agentActivatedPlan.currentPlan.id)) {
                                plan["active"] = true;
                            }
                            else {
                                plan["active"] = false;
                            }
                        }
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(plansToSend)];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6, "Error");
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AgentService;
}());
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map