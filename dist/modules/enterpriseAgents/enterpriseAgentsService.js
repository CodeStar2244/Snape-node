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
exports.EnterpriseAgentsService = void 0;
var enterpriseBooking_1 = require("../../entities/enterpriseBooking");
var db_config_1 = require("../../db/db.config");
var Tblagent_1 = require("../../entities/Tblagent");
var Tblagentmediacategoriesmapping_1 = require("../../entities/Tblagentmediacategoriesmapping");
var Tblbooking_1 = require("../../entities/Tblbooking");
var Tblmediacategories_1 = require("../../entities/Tblmediacategories");
var enterPriseClient_1 = require("../../entities/enterPriseClient");
var enterpriseAgentFavourite_1 = __importDefault(require("../../entities/enterpriseAgentFavourite"));
var responseBuilder_1 = require("../../helpers/responseBuilder");
var enterpriseAgentsModel_1 = require("./enterpriseAgentsModel");
var Portfolio_1 = __importDefault(require("../../entities/Portfolio"));
var portfolioFiles_1 = __importDefault(require("../../entities/portfolioFiles"));
var EnterpriseAgentsService = /** @class */ (function () {
    function EnterpriseAgentsService() {
    }
    EnterpriseAgentsService.prototype.getAgents = function (query, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, agentRepo, enterpriseAgentFavouriteRepo, offset, limit, favouriteAgents, agentsArr, agentQuery, agents, agnetCounts, _i, agents_1, agent, dataToSend, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        queryObj = new enterpriseAgentsModel_1.AgentGetList(null, query);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        enterpriseAgentFavouriteRepo = db_config_1.AppDataSource.getRepository(enterpriseAgentFavourite_1.default);
                        offset = (+queryObj.page) * +queryObj.limit;
                        limit = queryObj.limit;
                        return [4 /*yield*/, enterpriseAgentFavouriteRepo.createQueryBuilder("fav")
                                .select("fav.id", "id")
                                .addSelect("fav.clientId", "client")
                                .addSelect("fav.agentId", "agent")
                                .where("fav.clientId = :clientId", { clientId: userDetails.id }).getRawMany()];
                    case 1:
                        favouriteAgents = _a.sent();
                        agentsArr = favouriteAgents.map(function (obj) { return obj.agent; });
                        agentQuery = agentRepo.createQueryBuilder("agent")
                            .leftJoin("tblimages", "images", "agent.id = images.entityid AND entitytype = 'agent'")
                            .select("agent.id", "id")
                            .addSelect("agent.firstname", "firstname")
                            .addSelect("images.imagepath", "profile")
                            .addSelect("agent.email", "email")
                            .addSelect("agent.latitude", "latitude")
                            .addSelect("agent.longitude", "longitude")
                            .addSelect("agent.lastname", "lastname")
                            .addSelect("agent.experiencelevel", "experiencelevel")
                            .addSelect("agent.speciality", "speciality")
                            .addSelect("agent.photograpyrate", "photograpyrate")
                            .addSelect("agent.videograpyrate", "videograpyrate")
                            .addSelect("agent.bothrate", "bothrate")
                            .addSelect("agent.createdondate", "createdAt")
                            .addSelect("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') as distance"))
                            .where("agent.isonline = :isonline", { isonline: true })
                            .andWhere("calculate_distance(agent.latitude , agent.longitude,".concat(queryObj.latitude, " ,").concat(queryObj.longitude, ",'K') < ").concat(queryObj.range));
                        if (query.speciality) {
                            agentQuery.andWhere("agent.speciality = :speciality", { speciality: query.speciality });
                        }
                        agentQuery.offset(offset);
                        agentQuery.limit(limit);
                        return [4 /*yield*/, agentQuery.getRawMany()];
                    case 2:
                        agents = _a.sent();
                        return [4 /*yield*/, agentQuery.getCount()];
                    case 3:
                        agnetCounts = _a.sent();
                        for (_i = 0, agents_1 = agents; _i < agents_1.length; _i++) {
                            agent = agents_1[_i];
                            if (agentsArr.includes(agent.id)) {
                                agent.isFavourite = true;
                            }
                            else {
                                agent.isFavourite = false;
                            }
                        }
                        dataToSend = {
                            agents: agents,
                            total: agnetCounts
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1, "Err");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getFavouriteAgentList = function (query, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, agentRepo, enterpriseAgentFavouriteRepo, offset, limit, favouriteAgentsQuery, agents, agnetCounts, dataToSend, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        queryObj = new enterpriseAgentsModel_1.AgentGetList(null, query);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        enterpriseAgentFavouriteRepo = db_config_1.AppDataSource.getRepository(enterpriseAgentFavourite_1.default);
                        offset = (+queryObj.page) * +queryObj.limit;
                        limit = queryObj.limit;
                        favouriteAgentsQuery = enterpriseAgentFavouriteRepo.createQueryBuilder("fav")
                            .leftJoin("tblagent", "agent", "fav.agentId = agent.id")
                            .leftJoin("tblimages", "images", "agent.id = images.entityid AND entitytype = 'agent'")
                            .select("agent.id", "id")
                            .addSelect("agent.firstname", "firstname")
                            .addSelect("images.imagepath", "profile")
                            .addSelect("agent.email", "email")
                            .addSelect("agent.latitude", "latitude")
                            .addSelect("agent.longitude", "longitude")
                            .addSelect("agent.lastname", "lastname")
                            .addSelect("agent.experiencelevel", "experiencelevel")
                            .addSelect("agent.speciality", "speciality")
                            .addSelect("agent.photograpyrate", "photograpyrate")
                            .addSelect("agent.videograpyrate", "videograpyrate")
                            .addSelect("agent.bothrate", "bothrate")
                            .addSelect("agent.createdondate", "createdAt")
                            .where("fav.clientId = :clientId ", { clientId: userDetails.id })
                            .offset(offset)
                            .limit(limit);
                        return [4 /*yield*/, favouriteAgentsQuery.getRawMany()];
                    case 1:
                        agents = _a.sent();
                        return [4 /*yield*/, favouriteAgentsQuery.getCount()];
                    case 2:
                        agnetCounts = _a.sent();
                        dataToSend = {
                            agents: agents,
                            total: agnetCounts
                        };
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(dataToSend)];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2, "Err");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.bookAgentRequest = function (body, params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, enterpriseClientRepo, agentRepo, enterpriseBookingRepo, agent, enterpriseClient, enterpriseBooking, created, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        agentId = params.id;
                        enterpriseClientRepo = db_config_1.AppDataSource.getRepository(enterPriseClient_1.EnterPriseClient);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        enterpriseBookingRepo = db_config_1.AppDataSource.getRepository(enterpriseBooking_1.EnterpriseBooking);
                        return [4 /*yield*/, agentRepo.findOne({ where: { id: agentId } })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Agent Not found")];
                        }
                        return [4 /*yield*/, enterpriseClientRepo.findOne({ where: {
                                    id: userDetails.id
                                } })];
                    case 2:
                        enterpriseClient = _a.sent();
                        enterpriseBooking = enterpriseBookingRepo.create({
                            bookingDate: body.bookingDate,
                            bookingStartDateTime: body.bookingStartDateTime,
                            bookingEndDateTime: body.bookingEndDateTime,
                            bookingstatusid: 0,
                            address1: body.address1,
                            address2: body.address2,
                            agentId: agent,
                            clientId: enterpriseClient,
                            hours: body.hours,
                            latitude: body.latitude,
                            speciality: body.speciality,
                            longitude: body.longitude,
                            mediacategories: JSON.stringify(body.categories)
                        });
                        return [4 /*yield*/, enterpriseBookingRepo.save(enterpriseBooking)];
                    case 3:
                        created = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(created)];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3, "Err");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
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
                        if (query.speciality) {
                            agentQuery.andWhere("agent.speciality = :speciality", { speciality: query.speciality });
                        }
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
            var agentId, agentRepo, agentQuery, agent, dataToSend, error_4;
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
                        error_4 = _a.sent();
                        console.log(error_4, "Er");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentCategories = function (params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, agentCategoriesRepo, mediaCategoriesRepo, agentQuery, agent, dataToSend, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        agentId = params.agentId;
                        agentCategoriesRepo = db_config_1.AppDataSource.getRepository(Tblagentmediacategoriesmapping_1.Tblagentmediacategoriesmapping);
                        mediaCategoriesRepo = db_config_1.AppDataSource.getRepository(Tblmediacategories_1.Tblmediacategories);
                        agentQuery = agentCategoriesRepo.createQueryBuilder("mediamapping")
                            .leftJoin("tblmediacategories", "categories", "categories.id = mediamapping.mediacategoryid")
                            .leftJoin("tblimages", "images", "categories.id = images.entityid AND entitytype = 'mediacategory'")
                            .select("mediamapping.mediacategoryid", "id")
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
                        error_5 = _a.sent();
                        console.log(error_5, "Err");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentPortfolio = function (params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, agentRepo, agentPortFolioRepo, portFolioFilesRepo, agent, agentPortfolio, portFolioFiles, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        agentId = params.agentId;
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        agentPortFolioRepo = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        portFolioFilesRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, agentRepo.findOne({ where: { id: agentId } })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest('Agent not exits')];
                        }
                        return [4 /*yield*/, agentPortFolioRepo.findOne({
                                where: {
                                    createdBy: { id: agent.id },
                                    // status:CollectionStatus.HIDDEN
                                }
                            })];
                    case 2:
                        agentPortfolio = _a.sent();
                        return [4 /*yield*/, portFolioFilesRepo.find(({
                                where: {
                                    portfolio: { id: agentPortfolio.id }
                                },
                                select: {
                                    compressedCdnUrl: true,
                                    width: true,
                                    height: true,
                                    id: true,
                                    name: true,
                                    type: true
                                }
                            }))];
                    case 3:
                        portFolioFiles = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ portFolioFiles: portFolioFiles })];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6, "Err");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.getAgentReviews = function (params, userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var agentId, bookingRepo, agentRepo, agent, bookings, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentId = params.agentId;
                        bookingRepo = db_config_1.AppDataSource.getRepository(Tblbooking_1.Tblbooking);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        return [4 /*yield*/, agentRepo.findOne({ where: { id: agentId } })];
                    case 1:
                        agent = _a.sent();
                        if (!agent) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Agent not exists")];
                        }
                        return [4 /*yield*/, bookingRepo.createQueryBuilder("b")
                                .leftJoin("tblimages", "images", "b.clientId = images.entityid AND entitytype = 'client'")
                                .leftJoin("tblclient", "client", "b.clientId = client.id")
                                .select("b.id", "id")
                                .addSelect("client.firstname", "firstname")
                                .addSelect("client.lastname", "lastname")
                                .addSelect("images.imagepath", "profile")
                                .addSelect("b.head", "title")
                                .addSelect("b.message", "description")
                                .addSelect("b.agentrating", "rating")
                                .where("b.agentId = :agentId", { agentId: agentId })
                                .andWhere("b.bookingstatusid = 10")
                                .getRawMany()];
                    case 2:
                        bookings = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ bookings: bookings })];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7, "Err");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EnterpriseAgentsService.prototype.addRemoveFavourite = function (params, userDetails, agentId) {
        return __awaiter(this, void 0, void 0, function () {
            var agentRepo, enterpriseRepo, enterpriseAgentFavouriteRepo, agent, enterpriseClient, enterpriseAgentFavourite, enterpriseAgentFavouriteEntry, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        enterpriseRepo = db_config_1.AppDataSource.getRepository(enterPriseClient_1.EnterPriseClient);
                        enterpriseAgentFavouriteRepo = db_config_1.AppDataSource.getRepository(enterpriseAgentFavourite_1.default);
                        return [4 /*yield*/, agentRepo.findOne({ where: { id: agentId } })];
                    case 1:
                        agent = _a.sent();
                        return [4 /*yield*/, enterpriseRepo.findOne({ where: { id: userDetails.id } })];
                    case 2:
                        enterpriseClient = _a.sent();
                        return [4 /*yield*/, enterpriseAgentFavouriteRepo.findOne({
                                where: {
                                    clientId: {
                                        id: enterpriseClient.id
                                    },
                                    agentId: {
                                        id: agent.id
                                    }
                                }
                            })];
                    case 3:
                        enterpriseAgentFavourite = _a.sent();
                        if (params.isFavourite === '0') {
                            if (enterpriseAgentFavourite) {
                                enterpriseAgentFavouriteRepo.remove(enterpriseAgentFavourite);
                            }
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ message: 'Favourite Removed' })];
                        }
                        else {
                            if (enterpriseAgentFavourite) {
                                return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ message: 'Favourite Added Already' })];
                            }
                            else {
                                enterpriseAgentFavouriteEntry = enterpriseAgentFavouriteRepo.create({
                                    clientId: enterpriseClient,
                                    agentId: agent
                                });
                                enterpriseAgentFavouriteRepo.save(enterpriseAgentFavouriteEntry);
                            }
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ message: 'Favourite Added' })];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        console.log(error_8, "Err");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return EnterpriseAgentsService;
}());
exports.EnterpriseAgentsService = EnterpriseAgentsService;
//# sourceMappingURL=enterpriseAgentsService.js.map