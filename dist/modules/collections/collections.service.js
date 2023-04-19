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
exports.CollectionService = void 0;
var typeorm_1 = require("typeorm");
var db_config_1 = require("../../db/db.config");
var Collection_1 = __importDefault(require("../../entities/Collection"));
var collectionDesign_1 = require("../../entities/collectionDesign");
var CollectionTags_1 = require("../../entities/CollectionTags");
var CollectionThemes_1 = require("../../entities/CollectionThemes");
var Files_1 = __importDefault(require("../../entities/Files"));
var awss3_1 = require("../../helpers/awss3");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var collections_model_1 = require("./collections.model");
var constants_1 = require("../../config/constants");
var agent_service_1 = require("../user/agent.service");
var uuidv4_1 = require("uuidv4");
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        var _this = this;
        this.s3 = new awss3_1.AWSS3();
        this.agentService = new agent_service_1.AgentService();
        this.createCollection = function (body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, designRepo, themerepo, collection, theme, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        designRepo = db_config_1.AppDataSource.getRepository(collectionDesign_1.CollectionDesign);
                        themerepo = db_config_1.AppDataSource.getRepository(CollectionThemes_1.CollectionThemes);
                        return [4 /*yield*/, collectionRepository.save({
                                name: body.name,
                                eventDate: body.eventDate,
                                url: (0, uuidv4_1.uuid)(),
                                createdBy: userDetails.id
                            })];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, themerepo.findOneBy({ id: 1 })];
                    case 2:
                        theme = _a.sent();
                        return [4 /*yield*/, designRepo.save({
                                typography: "Sans",
                                collections: collection,
                                theme: theme
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collection, "Collection created SuccessFully")];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getCollections = function (userDetails, search, order, sort) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, query, collections, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        return [4 /*yield*/, collectionRepository.createQueryBuilder("collections")
                                .select("collections.name", "name")
                                .addSelect("collections.id", "id")
                                .addSelect("collections.coverPhoto", "coverPhoto")
                                .addSelect("collections.photos", "photos")
                                .addSelect("collections.videos", "videos")
                                .addSelect("collections.eventDate", "eventDate")
                                .where("collections.createdBy = :agentId", { agentId: userDetails.id })
                                .loadRelationIdAndMap("agentId", "collections.createdBy")];
                    case 1:
                        query = _a.sent();
                        if (search) {
                            query.andWhere('collections.name ILIKE :name', { name: "%".concat(search, "%") });
                        }
                        if (sort && order) {
                            query.addOrderBy("collections.".concat(sort), order.toUpperCase());
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 2:
                        collections = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collections)];
                    case 3:
                        error_2 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.listThemes = function () { return __awaiter(_this, void 0, void 0, function () {
            var themeRepository, themes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        themeRepository = db_config_1.AppDataSource.getRepository(CollectionThemes_1.CollectionThemes);
                        return [4 /*yield*/, themeRepository.find()];
                    case 1:
                        themes = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(themes)];
                    case 2:
                        error_3 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectionByID = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, collection, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        return [4 /*yield*/, collectionRepository.createQueryBuilder("collections")
                                .leftJoin("collection_tag_join", "tagsJoin", "tagsJoin.collectionsId=collections.id")
                                .leftJoin("collection_tags", "tags", "tagsJoin.collectionTagsId=tags.id")
                                .select("collections.name", "name")
                                .addSelect("collections.id", "id")
                                .addSelect("collections.socialSharing", "socialSharing")
                                .addSelect("collections.download", "download")
                                .addSelect("collections.password", "password")
                                .addSelect("collections.downloadPin", "downloadPin")
                                .addSelect("collections.slug", "url")
                                .addSelect("collections.status", "status")
                                .addSelect("array_remove(array_agg(tags.tag), NULL)", "tags")
                                .addSelect("collections.coverPhoto", "coverPhoto")
                                .addSelect("collections.photos", "photos")
                                .addSelect("collections.videos", "videos")
                                .addSelect("collections.eventDate", "eventDate")
                                .addSelect("collections.createdAt", "createdAt")
                                .addSelect("collections.updatedAt", "updatedAt")
                                .where("collections.createdBy = :agentId", { agentId: userDetails.id })
                                .andWhere("collections.id =:id", { id: Number(id) })
                                .loadRelationIdAndMap("agentId", "collections.createdBy")
                                .addGroupBy("collections.id")
                                .getRawOne()];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collection)];
                    case 2:
                        error_4 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectionDesign = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, designRepo, collection, collectionDesign, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        designRepo = db_config_1.AppDataSource.getRepository(collectionDesign_1.CollectionDesign);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, designRepo.findOne({
                                where: {
                                    collections: {
                                        id: id
                                    }
                                },
                                relations: ["theme"]
                            })];
                    case 2:
                        collectionDesign = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collectionDesign)];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5, "er");
                        throw responseBuilder_1.ResponseBuilder.error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCollection = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, files, _i, files_1, file, agentSpace, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo.createQueryBuilder("files")
                                .where({ collection: id }).loadAllRelationIds().orderBy({ "files.createdAt": "ASC" }).getMany()];
                    case 2:
                        files = _a.sent();
                        for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                            file = files_1[_i];
                            this.s3.deleteS3File(file.key);
                        }
                        return [4 /*yield*/, collectionRepository.delete({ id: id })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.agentService.getRemaningBalance(userDetails)];
                    case 4:
                        agentSpace = _a.sent();
                        return [2 /*return*/, agentSpace];
                    case 5:
                        error_6 = _a.sent();
                        console.log(error_6, "er");
                        throw responseBuilder_1.ResponseBuilder.error(error_6);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFiles = function (userDetails, id, ids) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, idsArr, queryOptions, files, _i, files_2, file, filesToBeDeleted, agentSpace, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        idsArr = ids;
                        queryOptions = {
                            where: {
                                collection: {
                                    id: id
                                },
                                id: (0, typeorm_1.In)(idsArr)
                            }
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
                        error_7 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_7);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectionFiles = function (userDetails, id, search, sort, order) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, query, files, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo.createQueryBuilder("files")
                                .select("files.id", "id")
                                .addSelect("files.name", "name")
                                .addSelect("files.key", "key")
                                .addSelect("files.size", "size")
                                .addSelect("files.cdnUrl", "url")
                                .addSelect("files.type", "type")
                                .addSelect("files.createdAt", "createdAt")
                                .addSelect("files.updatedAt", "updatedAt")
                                .addSelect("files.collectionId", "collectionId")
                                .where({ collection: id }).loadAllRelationIds()];
                    case 2:
                        query = _a.sent();
                        if (search) {
                            query.andWhere('files.name like :name', { name: "%".concat(search, "%") });
                        }
                        if (sort && order) {
                            query.addOrderBy("files.".concat(sort), order.toUpperCase());
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 3:
                        files = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(files)];
                    case 4:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw responseBuilder_1.ResponseBuilder.error(error_8);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectionFilesName = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, query, files, fileNamesArr, _i, files_3, filename, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, fileRepo.createQueryBuilder("files")
                                .select("files.name", "name")
                                .where({ collection: id }).loadAllRelationIds()];
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
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw responseBuilder_1.ResponseBuilder.error(error_9);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateCollection = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, tagRepo, collection, _a, name_1, url, eventDate, download, downloadPin, socialSharing, status_1, password, tags, coverPhoto, slug, tagsArr, collectionTagsArr, _i, tagsArr_1, tag, prevTag, newTag, updateObject, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        tagRepo = db_config_1.AppDataSource.getRepository(CollectionTags_1.CollectionTags);
                        return [4 /*yield*/, collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id })];
                    case 1:
                        collection = _b.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        console.log(body);
                        _a = new collections_model_1.UpdateCollectionModel(body), name_1 = _a.name, url = _a.url, eventDate = _a.eventDate, download = _a.download, downloadPin = _a.downloadPin, socialSharing = _a.socialSharing, status_1 = _a.status, password = _a.password, tags = _a.tags, coverPhoto = _a.coverPhoto, slug = _a.slug;
                        tagsArr = tags ? tags : [];
                        collectionTagsArr = [];
                        _i = 0, tagsArr_1 = tagsArr;
                        _b.label = 2;
                    case 2:
                        if (!(_i < tagsArr_1.length)) return [3 /*break*/, 6];
                        tag = tagsArr_1[_i];
                        return [4 /*yield*/, tagRepo.findOneBy({ tag: tag.trim() })];
                    case 3:
                        prevTag = _b.sent();
                        return [4 /*yield*/, tagRepo.save(__assign(__assign({}, prevTag), { tag: tag.trim() }))];
                    case 4:
                        newTag = _b.sent();
                        collectionTagsArr.push(newTag);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        updateObject = {
                            name: name_1,
                            url: url,
                            eventDate: eventDate,
                            download: download,
                            downloadPin: downloadPin,
                            status: status_1,
                            password: password,
                            socialSharing: socialSharing,
                            coverPhoto: coverPhoto,
                            slug: slug
                        };
                        return [4 /*yield*/, collectioRepo.save(__assign(__assign(__assign({}, collection), updateObject), { tags: collectionTagsArr }))];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, this.getCollectionByID(userDetails, collection.id)];
                    case 8:
                        error_10 = _b.sent();
                        console.log(error_10, "error");
                        if (+error_10.code === 23505) {
                            throw responseBuilder_1.ResponseBuilder.errorMessage("Url already exists");
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_10, "Internal Server Error");
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.collectionDesign = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, designRepo, themerepo, collection, collectionDesign, _a, theme, x, y, gridSpacing, gridStyle, typography, updateObject, updatedTheme, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        designRepo = db_config_1.AppDataSource.getRepository(collectionDesign_1.CollectionDesign);
                        themerepo = db_config_1.AppDataSource.getRepository(CollectionThemes_1.CollectionThemes);
                        return [4 /*yield*/, collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id })];
                    case 1:
                        collection = _b.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, designRepo.findOneBy({
                                collections: {
                                    id: collection.id
                                }
                            })];
                    case 2:
                        collectionDesign = _b.sent();
                        _a = new collections_model_1.CollectionDesignModel(body), theme = _a.theme, x = _a.x, y = _a.y, gridSpacing = _a.gridSpacing, gridStyle = _a.gridStyle, typography = _a.typography;
                        updateObject = {
                            theme: theme,
                            focusX: x, focusY: y,
                            gridSpacing: gridSpacing,
                            gridStyle: gridStyle,
                            typography: typography,
                            collection: collection.id
                        };
                        return [4 /*yield*/, themerepo.findOneBy({ id: theme })];
                    case 3:
                        updatedTheme = _b.sent();
                        return [4 /*yield*/, designRepo.save(__assign(__assign(__assign({}, collectionDesign), updateObject), { collections: collection, theme: updatedTheme }))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(updateObject)];
                    case 5:
                        error_11 = _b.sent();
                        console.log(error_11, "error");
                        if (+error_11.code === 23505) {
                            throw responseBuilder_1.ResponseBuilder.errorMessage("Url already exists");
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_11, "Internal Server Error");
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.changeCoverPhoto = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, tagRepo, collection, updateCollection, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        tagRepo = db_config_1.AppDataSource.getRepository(CollectionTags_1.CollectionTags);
                        return [4 /*yield*/, collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, collectioRepo.update(params.id, { coverPhoto: body.url })];
                    case 2:
                        updateCollection = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(updateCollection)];
                    case 3:
                        error_12 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_12, "Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.uploadFiles = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, fileRepo, collection, collectionFiles, fileNamesArr, files, filesUploadArr, _i, files_4, file, existFile, reponse, agentSpace, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [4 /*yield*/, this.getCollectionFilesName(userDetails, collection.id)];
                    case 2:
                        collectionFiles = _a.sent();
                        fileNamesArr = collectionFiles.result;
                        files = body.files;
                        filesUploadArr = [];
                        if (collection.photos === 0) {
                            collectioRepo.save(__assign(__assign({}, collection), { coverPhoto: constants_1.CDN_URL + files[0].key }));
                        }
                        _i = 0, files_4 = files;
                        _a.label = 3;
                    case 3:
                        if (!(_i < files_4.length)) return [3 /*break*/, 8];
                        file = files_4[_i];
                        return [4 /*yield*/, fileRepo.findOne({ where: { key: file.key } })];
                    case 4:
                        existFile = _a.sent();
                        if (!existFile) return [3 /*break*/, 6];
                        return [4 /*yield*/, fileRepo.delete(existFile === null || existFile === void 0 ? void 0 : existFile.id)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (fileNamesArr.includes(file.name)) {
                            throw new Error(constants_1.FILE_ALREADY_EXISTS);
                        }
                        filesUploadArr.push(fileRepo.save({
                            name: file.name,
                            url: file.url,
                            size: file.size,
                            type: file.type,
                            key: file.key,
                            cdnUrl: constants_1.CDN_URL + file.key,
                            height: file.height,
                            width: file.width,
                            collection: params.id
                        }));
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, Promise.all(filesUploadArr)];
                    case 9:
                        reponse = _a.sent();
                        return [4 /*yield*/, this.agentService.getRemaningBalance(userDetails)];
                    case 10:
                        agentSpace = _a.sent();
                        return [2 /*return*/, agentSpace];
                    case 11:
                        error_13 = _a.sent();
                        if (error_13.message === constants_1.FILE_ALREADY_EXISTS) {
                            throw responseBuilder_1.ResponseBuilder.fileExists(error_13, constants_1.FILE_ALREADY_EXISTS);
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_13, "Internal Server Error");
                    case 12: return [2 /*return*/];
                }
            });
        }); };
    }
    return CollectionService;
}());
exports.CollectionService = CollectionService;
//# sourceMappingURL=collections.service.js.map