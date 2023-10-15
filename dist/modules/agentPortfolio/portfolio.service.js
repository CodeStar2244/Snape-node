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
exports.PortfolioService = void 0;
var typeorm_1 = require("typeorm");
var db_config_1 = require("../../db/db.config");
var Portfolio_1 = __importDefault(require("../../entities/Portfolio"));
var awss3_1 = require("../../helpers/awss3");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var constants_1 = require("../../config/constants");
var agent_service_1 = require("../user/agent.service");
var uuidv4_1 = require("uuidv4");
var utils_1 = require("../../utils/utils");
var Tblagent_1 = require("../../entities/Tblagent");
var portfolioFiles_1 = __importDefault(require("../../entities/portfolioFiles"));
var portFolioVideosLink_1 = __importStar(require("../../entities/portFolioVideosLink"));
var Portfolio_2 = __importDefault(require("../../entities/Portfolio"));
var portfolio_model_1 = require("./portfolio.model");
var PortfolioService = /** @class */ (function () {
    function PortfolioService() {
        var _this = this;
        this.s3 = new awss3_1.AWSS3();
        this.agentService = new agent_service_1.AgentService();
        this.utils = new utils_1.Utils();
        this.createPortfolio = function (body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var agentRepo, portfolioRepository, slug, agent, portfolio, newPortFolio, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        agentRepo = db_config_1.AppDataSource.getRepository(Tblagent_1.Tblagent);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        slug = (0, uuidv4_1.uuid)();
                        return [4 /*yield*/, agentRepo.findOne({
                                where: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        agent = _a.sent();
                        return [4 /*yield*/, portfolioRepository.findOne({
                                where: {
                                    createdBy: {
                                        id: agent.id,
                                    },
                                },
                            })];
                    case 2:
                        portfolio = _a.sent();
                        if (portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Already Exists")];
                        }
                        return [4 /*yield*/, portfolioRepository.save({
                                name: agent.firstname + agent.lastname,
                                createdBy: userDetails.id,
                            })];
                    case 3:
                        newPortFolio = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(newPortFolio, "Portfolio created SuccessFully")];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolios = function (userDetails, search, order, sort) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, query, portfolios, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        return [4 /*yield*/, portfolioRepository
                                .createQueryBuilder("portfolios")
                                .select("portfolios.name", "name")
                                .addSelect("portfolios.id", "id")
                                .addSelect("portfolios.coverPhoto", "coverPhoto")
                                .addSelect("portfolios.photos", "photos")
                                .addSelect("portfolios.videos", "videos")
                                .where("portfolios.createdBy = :agentId", { agentId: userDetails.id })
                                .loadRelationIdAndMap("agentId", "portfolios.createdBy")];
                    case 1:
                        query = _a.sent();
                        if (search) {
                            query.andWhere("portfolios.name ILIKE :name", { name: "%".concat(search, "%") });
                        }
                        if (sort && order) {
                            query.addOrderBy("portfolios.".concat(sort), order.toUpperCase());
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 2:
                        portfolios = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(portfolios)];
                    case 3:
                        error_2 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolioByID = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, portfolio, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        return [4 /*yield*/, portfolioRepository
                                .createQueryBuilder("portfolios")
                                .select("portfolios.name", "name")
                                .addSelect("portfolios.id", "id")
                                .addSelect("portfolios.status", "status")
                                .addSelect("portfolios.coverPhoto", "coverPhoto")
                                .addSelect("portfolios.photos", "photos")
                                .addSelect("portfolios.videos", "videos")
                                .addSelect("portfolios.createdAt", "createdAt")
                                .addSelect("portfolios.updatedAt", "updatedAt")
                                .where("portfolios.createdBy = :agentId", { agentId: userDetails.id })
                                .andWhere("portfolios.id =:id", { id: Number(id) })
                                .loadRelationIdAndMap("agentId", "portfolios.createdBy")
                                .addGroupBy("portfolios.id")
                                .getRawOne()];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(portfolio)];
                    case 2:
                        error_3 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletePortfolio = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, fileRepo, portfolio, files, _i, files_1, file, agentSpace, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, portfolioRepository.findOneBy({
                                id: id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo
                                .createQueryBuilder("files")
                                .where({ portfolio: id })
                                .loadAllRelationIds()
                                .orderBy({ "files.createdAt": "ASC" })
                                .getMany()];
                    case 2:
                        files = _a.sent();
                        for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                            file = files_1[_i];
                            this.s3.deleteS3File(file.key);
                        }
                        return [4 /*yield*/, portfolioRepository.delete({ id: id })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.agentService.getRemaningBalance(userDetails)];
                    case 4:
                        agentSpace = _a.sent();
                        return [2 /*return*/, agentSpace];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4, "er");
                        throw responseBuilder_1.ResponseBuilder.error(error_4);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFiles = function (userDetails, id, ids) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, fileRepo, portfolio, idsArr, queryOptions, files, _i, files_2, file, filesToBeDeleted, agentSpace, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, portfolioRepository.findOneBy({
                                id: id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        idsArr = ids;
                        queryOptions = {
                            where: {
                                portfolio: {
                                    id: id,
                                },
                                id: (0, typeorm_1.In)(idsArr),
                            },
                        };
                        return [4 /*yield*/, fileRepo.find(queryOptions)];
                    case 2:
                        files = _a.sent();
                        for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                            file = files_2[_i];
                            this.s3.deleteS3File(file.key);
                        }
                        return [4 /*yield*/, fileRepo.delete(ids)];
                    case 3:
                        filesToBeDeleted = _a.sent();
                        return [4 /*yield*/, this.agentService.getRemaningBalance(userDetails)];
                    case 4:
                        agentSpace = _a.sent();
                        return [2 /*return*/, agentSpace];
                    case 5:
                        error_5 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_5);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolioFiles = function (userDetails, id, search, sort, order) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, fileRepo, portfolio, query, files, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, portfolioRepository.findOneBy({
                                id: id,
                                createdBy: userDetails.id,
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo
                                .createQueryBuilder("files")
                                .select("files.id", "id")
                                .addSelect("files.name", "name")
                                .addSelect("files.key", "key")
                                .addSelect("files.size", "size")
                                .addSelect("files.compressedCdnUrl", "url")
                                .addSelect("files.type", "type")
                                .addSelect("files.createdAt", "createdAt")
                                .addSelect("files.updatedAt", "updatedAt")
                                .addSelect("files.portfolioId", "portfolioId")
                                .where({ portfolio: id })
                                .loadAllRelationIds()];
                    case 2:
                        query = _a.sent();
                        if (search) {
                            query.andWhere("files.name like :name", { name: "%".concat(search, "%") });
                        }
                        if (sort && order) {
                            query.addOrderBy("files.".concat(sort), order.toUpperCase());
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 3:
                        files = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(files)];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw responseBuilder_1.ResponseBuilder.error(error_6);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolioFilesName = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var portfolioRepository, fileRepo, portfolio, query, files, fileNamesArr, _i, files_3, filename, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        portfolioRepository = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, portfolioRepository.findOneBy({
                                id: id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo
                                .createQueryBuilder("files")
                                .select("files.name", "name")
                                .where({ portfolio: id })
                                .loadAllRelationIds()];
                    case 2:
                        query = _a.sent();
                        return [4 /*yield*/, query.getRawMany()];
                    case 3:
                        files = _a.sent();
                        fileNamesArr = [];
                        for (_i = 0, files_3 = files; _i < files_3.length; _i++) {
                            filename = files_3[_i];
                            fileNamesArr.push(filename === null || filename === void 0 ? void 0 : filename.name);
                        }
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(fileNamesArr)];
                    case 4:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw responseBuilder_1.ResponseBuilder.error(error_7);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.changeCoverPhoto = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, portfolio, updatePortfolio, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        return [4 /*yield*/, collectioRepo.findOneBy({
                                id: params.id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, collectioRepo.update(params.id, {
                                coverPhoto: body.url,
                            })];
                    case 2:
                        updatePortfolio = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(updatePortfolio)];
                    case 3:
                        error_8 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_8, "Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.uploadFiles = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, fileRepo, portfolio, portfolioFiles, fileNamesArr, files, filesUploadArr, compressedCollectoinPhoto, _i, files_4, file, existFile, compressedKey, reponse, agentSpace, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 14, , 15]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Portfolio_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(portfolioFiles_1.default);
                        return [4 /*yield*/, collectioRepo.findOneBy({
                                id: params.id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, this.getPortfolioFilesName(userDetails, portfolio.id)];
                    case 2:
                        portfolioFiles = _a.sent();
                        fileNamesArr = portfolioFiles.result;
                        files = body.files;
                        filesUploadArr = [];
                        if (!(portfolio.photos === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.utils.compressPortfolioImage(files[0].key, params.id)];
                    case 3:
                        compressedCollectoinPhoto = _a.sent();
                        collectioRepo.save(__assign(__assign({}, portfolio), { coverPhoto: constants_1.CDN_URL + compressedCollectoinPhoto.key }));
                        _a.label = 4;
                    case 4:
                        _i = 0, files_4 = files;
                        _a.label = 5;
                    case 5:
                        if (!(_i < files_4.length)) return [3 /*break*/, 11];
                        file = files_4[_i];
                        return [4 /*yield*/, fileRepo.findOne({ where: { key: file.key } })];
                    case 6:
                        existFile = _a.sent();
                        if (!existFile) return [3 /*break*/, 8];
                        return [4 /*yield*/, fileRepo.delete(existFile === null || existFile === void 0 ? void 0 : existFile.id)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (fileNamesArr.includes(file.name)) {
                            throw new Error(constants_1.FILE_ALREADY_EXISTS);
                        }
                        return [4 /*yield*/, this.utils.compressPortfolioImage(file.key, params.id)];
                    case 9:
                        compressedKey = _a.sent();
                        filesUploadArr.push(fileRepo.save({
                            name: file.name,
                            url: file.url,
                            size: file.size,
                            type: file.type,
                            key: file.key,
                            cdnUrl: constants_1.CDN_URL + file.key,
                            compressedKey: compressedKey.key,
                            compressedCdnUrl: constants_1.CDN_URL + compressedKey.key,
                            compressedImageSize: compressedKey.fileSize,
                            height: file.height,
                            width: file.width,
                            portfolio: params.id,
                        }));
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 5];
                    case 11: return [4 /*yield*/, Promise.all(filesUploadArr)];
                    case 12:
                        reponse = _a.sent();
                        return [4 /*yield*/, this.agentService.getRemaningBalance(userDetails)];
                    case 13:
                        agentSpace = _a.sent();
                        return [2 /*return*/, agentSpace];
                    case 14:
                        error_9 = _a.sent();
                        console.log(error_9, "errror");
                        if (error_9.message === constants_1.FILE_ALREADY_EXISTS) {
                            throw responseBuilder_1.ResponseBuilder.fileExists(error_9, constants_1.FILE_ALREADY_EXISTS);
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_9, "Internal Server Error");
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.addVideoLink = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var videoBody, portfolioVideoRepo, portfolioRepo, portfolio, videoLink, uploadedVideo, youtubeIframe, uploadedVideo, vimeoIframe, uploadedVideo, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        videoBody = new portfolio_model_1.AddVideoLink(body, params);
                        portfolioVideoRepo = db_config_1.AppDataSource.getRepository(portFolioVideosLink_1.default);
                        portfolioRepo = db_config_1.AppDataSource.getRepository(Portfolio_2.default);
                        return [4 /*yield*/, portfolioRepo.findOneBy({
                                id: params.id,
                                createdBy: {
                                    id: userDetails.id,
                                },
                            })];
                    case 1:
                        portfolio = _a.sent();
                        if (!portfolio) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Portfolio Not Found", 404)];
                        }
                        return [4 /*yield*/, portfolioVideoRepo.findOneBy({
                                url: videoBody.url,
                            })];
                    case 2:
                        videoLink = _a.sent();
                        if (videoLink) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Video Already exists")];
                        }
                        if (!videoBody.url.includes("iframe")) return [3 /*break*/, 4];
                        return [4 /*yield*/, portfolioVideoRepo.save({
                                iframe: videoBody.url,
                                portfolio: params.id,
                            })];
                    case 3:
                        uploadedVideo = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ uploadedVideo: uploadedVideo })];
                    case 4:
                        if (!videoBody.url.includes("youtu")) return [3 /*break*/, 6];
                        youtubeIframe = this.getIframeFromURL(videoBody.url);
                        return [4 /*yield*/, portfolioVideoRepo.save({
                                url: videoBody.url,
                                portfolio: params.id,
                                iframe: youtubeIframe,
                                type: portFolioVideosLink_1.VideoType.YOUTUBE,
                            })];
                    case 5:
                        uploadedVideo = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ uploadedVideo: uploadedVideo })];
                    case 6:
                        if (!videoBody.url.includes("vimeo")) return [3 /*break*/, 8];
                        vimeoIframe = this.getIframeFromURL(videoBody.url);
                        return [4 /*yield*/, portfolioVideoRepo.save({
                                url: videoBody.url,
                                portfolio: params.id,
                                iframe: vimeoIframe,
                                type: portFolioVideosLink_1.VideoType.VIMEO,
                            })];
                    case 7:
                        uploadedVideo = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ uploadedVideo: uploadedVideo })];
                    case 8: return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Video Url Not valid")];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_10 = _a.sent();
                        if (error_10.message === constants_1.FILE_ALREADY_EXISTS) {
                            throw responseBuilder_1.ResponseBuilder.fileExists(error_10, constants_1.FILE_ALREADY_EXISTS);
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_10, "Internal Server Error");
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.getIframeFromURL = function (videoURL) {
            if (videoURL.includes("iframe"))
                return videoURL;
            var ytRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|watch)\?.*v=|youtu\.be\/)|^.*youtu\.be\/)([^"&?/\s]{11})/i;
            var vimeoRegex = /vimeo\.com\/(?:video\/|.*\/videos\/)?([0-9]+)/i;
            var ytMatch = videoURL.match(ytRegex);
            var vimeoMatch = videoURL.match(vimeoRegex);
            console.log(ytMatch, "ytmatch");
            if (ytMatch) {
                return "\n        <iframe src=\"https://www.youtube.com/embed/".concat(ytMatch[1], "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>\n        ");
            }
            else if (vimeoMatch) {
                return "\n        <iframe src=\"https://player.vimeo.com/video/".concat(vimeoMatch[1], "?title=0&byline=0&portrait=0\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen></iframe>\n        ");
            }
            else {
                console.log("unknown video type");
            }
        };
    }
    return PortfolioService;
}());
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio.service.js.map