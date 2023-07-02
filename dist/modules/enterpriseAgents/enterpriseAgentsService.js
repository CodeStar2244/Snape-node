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
exports.EnterpriseAgentsService = void 0;
var db_config_1 = require("../../db/db.config");
var Tblagent_1 = require("../../entities/Tblagent");
var Tblagentmediacategoriesmapping_1 = require("../../entities/Tblagentmediacategoriesmapping");
var Tblmediacategories_1 = require("../../entities/Tblmediacategories");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var enterpriseAgentsModel_1 = require("./enterpriseAgentsModel");
var EnterpriseAgentsService = /** @class */ (function () {
    function EnterpriseAgentsService() {
    }
    EnterpriseAgentsService.prototype.getAgents = function (query, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, agentRepo, offset, limit, agentQuery, agents, agnetCounts, dataToSend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryObj = new enterpriseAgentsModel_1.AgentGetList(null, query);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        offset = (+queryObj.page) * +queryObj.limit;
                        limit = queryObj.limit;
                        agentQuery = agentRepo.createQueryBuilder("agent")
                            .select("agent.id", "id")
                            .addSelect("agent.email", "email")
                            .addSelect("agent.latitude", "latitude")
                            .addSelect("agent.longitude", "longitude")
                            .addSelect("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') as distance"))
                            .where("agent.isonline = :isonline", { isonline: true })
                            .andWhere("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') < ").concat(queryObj.range))
                            .offset(offset)
                            .limit(limit);
                        return [4 /*yield*/, agentQuery.getRawMany()];
                    case 1:
                        agents = _a.sent();
                        return [4 /*yield*/, agentQuery.getCount()];
                    case 2:
                        agnetCounts = _a.sent();
                        dataToSend = {
                            agents: agents,
                            total: agnetCounts
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentLocations = function (query, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, agentRepo, agentQuery, agents, dataToSend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryObj = new enterpriseAgentsModel_1.AgentGetList(null, query);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentQuery = agentRepo.createQueryBuilder("agent")
                            .select("agent.id", "id")
                            .addSelect("agent.firstname", "firstname")
                            .addSelect("agent.latitude", "latitude")
                            .addSelect("agent.longitude", "longitude")
                            .addSelect("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') as distance"))
                            .where("agent.isonline = :isonline", { isonline: true })
                            .andWhere("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') < ").concat(queryObj.range));
                        return [4 /*yield*/, agentQuery.getRawMany()];
                    case 1:
                        agents = _a.sent();
                        dataToSend = {
                            agents: agents
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentDetails = function (params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, agentRepo, agentQuery, agent, dataToSend, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        agentId = params.agentId;
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentQuery = agentRepo.createQueryBuilder("agent")
                            .leftJoin("tblimages", "images", "agent.id = images.entityid AND entitytype = 'agent'")
                            .select("agent.id", "id")
                            .addSelect("agent.firstname", "firstname")
                            .addSelect("images.imagepath", "profile")
                            .addSelect("agent.lastname", "lastname")
                            .addSelect("agent.experiencelevel", "experiencelevel")
                            .addSelect("agent.speciality", "speciality")
                            .addSelect("agent.photograpyrate", "photograpyrate")
                            .addSelect("agent.videograpyrate", "videograpyrate")
                            .addSelect("agent.bothrate", "bothrate")
                            .addSelect("agent.createdondate", "createdAt")
                            .where("agent.id = :agentId", { agentId: agentId });
                        return [4 /*yield*/, agentQuery.getRawOne()];
                    case 1:
                        agent = _a.sent();
                        dataToSend = {
                            agent: agent
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1, "Er");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentCategories = function (params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, agentCategoriesRepo, mediaCategoriesRepo, agentQuery, agent, dataToSend, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        agentId = params.agentId;
                        console.log(agentId, "agentID");
                        agentCategoriesRepo = db_config_1.AppDataSource.getRepository(Tblagentmediacategoriesmapping_1.Tblagentmediacategoriesmapping);
                        mediaCategoriesRepo = db_config_1.AppDataSource.getRepository(Tblmediacategories_1.Tblmediacategories);
                        agentQuery = agentCategoriesRepo.createQueryBuilder("mediamapping")
                            .leftJoin("tblmediacategories", "categories", "categories.id = mediamapping.mediacategoryid")
                            .leftJoin("tblimages", "images", "categories.id = images.entityid AND entitytype = 'mediacategory'")
                            .select("mediamapping.agentId", "id")
                            .addSelect("images.imagepath", "image")
                            .addSelect("categories.title")
                            .where("mediamapping.agentId = :agentId", { agentId: agentId });
                        return [4 /*yield*/, agentQuery.getRawMany()];
                    case 1:
                        agent = _a.sent();
                        dataToSend = {
                            agent: agent
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2, "Err");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EnterpriseAgentsService;
}());
exports.EnterpriseAgentsService = EnterpriseAgentsService;
//# sourceMappingURL=enterpriseAgentsService.js.map