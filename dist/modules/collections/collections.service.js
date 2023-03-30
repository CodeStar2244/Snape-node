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
var CollectionTags_1 = require("../../entities/CollectionTags");
var Files_1 = __importDefault(require("../../entities/Files"));
var awss3_1 = require("../../helpers/awss3");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var collections_model_1 = require("./collections.model");
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        var _this = this;
        this.s3 = new awss3_1.AWSS3();
        this.createCollection = function (body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, collection, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        return [4 /*yield*/, collectionRepository.save({
                                name: body.name,
                                eventDate: body.eventDate,
                                createdBy: userDetails.id
                            })];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collection, "Collection created SuccessFully")];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 3: return [2 /*return*/];
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
                                .leftJoin("collection_tag_join", "tagsJoin", "tagsJoin.collectionsId=collections.id")
                                .leftJoin("collection_tags", "tags", "tagsJoin.collectionTagsId=tags.id")
                                .select("collections.name", "name")
                                .addSelect("collections.id", "id")
                                .addSelect("ARRAY_AGG(tags.tag)", "tags")
                                .addSelect("collections.coverPhoto", "coverPhoto")
                                .addSelect("collections.photos", "photos")
                                .addSelect("collections.videos", "videos")
                                .addSelect("collections.eventDate", "eventDate")
                                .where("collections.createdBy = :agentId", { agentId: userDetails.id })
                                .loadRelationIdAndMap("agentId", "collections.createdBy")
                                .addGroupBy("collections.id")];
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
        this.getCollectionByID = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, collection, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        return [4 /*yield*/, collectionRepository.findOneBy({ id: id, createdBy: userDetails.id })];
                    case 1:
                        collection = _a.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collection)];
                    case 2:
                        error_3 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCollection = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, files, _i, files_1, file, error_4;
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
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collection)];
                    case 4:
                        error_4 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_4);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFiles = function (userDetails, id, ids) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, idsArr, queryOptions, files, _i, files_2, file, filesToBeDeleted, error_5;
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
                        console.log(files, "fa");
                        for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                            file = files_2[_i];
                            this.s3.deleteS3File(file.key);
                        }
                        return [4 /*yield*/, fileRepo.delete(ids)];
                    case 3:
                        filesToBeDeleted = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(filesToBeDeleted)];
                    case 4:
                        error_5 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_5);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectionFiles = function (userDetails, id, search, sort, order) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, fileRepo, collection, query, files, error_6;
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
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw responseBuilder_1.ResponseBuilder.error(error_6);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateCollection = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, tagRepo, collection, _a, name_1, url, eventDate, download, downloadPin, socialSharing, status_1, password, tags, tagsArr, collectionTagsArr, _i, tagsArr_1, tag, prevTag, newTag, updateObject, error_7;
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
                        _a = new collections_model_1.UpdateCollectionModel(body), name_1 = _a.name, url = _a.url, eventDate = _a.eventDate, download = _a.download, downloadPin = _a.downloadPin, socialSharing = _a.socialSharing, status_1 = _a.status, password = _a.password, tags = _a.tags;
                        tagsArr = tags ? tags === null || tags === void 0 ? void 0 : tags.split(',') : [];
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
                        };
                        return [4 /*yield*/, collectioRepo.save(__assign(__assign(__assign({}, collection), updateObject), { tags: collectionTagsArr }))];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(updateObject)];
                    case 8:
                        error_7 = _b.sent();
                        console.log(error_7, "error");
                        if (+error_7.code === 23505) {
                            throw responseBuilder_1.ResponseBuilder.errorMessage("Url already exists");
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_7, "Internal Server Error");
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.changeCoverPhoto = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, tagRepo, collection, updateCollection, error_8;
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
                        error_8 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_8, "Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.uploadFiles = function (params, body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var collectioRepo, fileRepo, collection, files, filesUploadArr, _i, files_3, file, reponse, error_9;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        collectioRepo = db_config_1.AppDataSource.getRepository(Collection_1.default);
                        fileRepo = db_config_1.AppDataSource.getRepository(Files_1.default);
                        return [4 /*yield*/, collectioRepo.findOneBy({ id: params.id, createdBy: userDetails.id })];
                    case 1:
                        collection = _b.sent();
                        if (!collection) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found", 404)];
                        }
                        files = body.files;
                        filesUploadArr = [];
                        if (collection.photos === 0) {
                            collectioRepo.save(__assign(__assign({}, collection), { coverPhoto: (_a = files[0]) === null || _a === void 0 ? void 0 : _a.url }));
                        }
                        for (_i = 0, files_3 = files; _i < files_3.length; _i++) {
                            file = files_3[_i];
                            filesUploadArr.push(fileRepo.save({
                                name: file.name,
                                url: file.url,
                                size: file.size,
                                type: file.type,
                                key: file.key,
                                collection: params.id
                            }));
                        }
                        return [4 /*yield*/, Promise.all(filesUploadArr)];
                    case 2:
                        reponse = _b.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(reponse, "Files Uploaded")];
                    case 3:
                        error_9 = _b.sent();
                        console.log(error_9, "error");
                        if (+error_9.code === 23505) {
                            throw responseBuilder_1.ResponseBuilder.errorMessage("Url already exists");
                        }
                        throw responseBuilder_1.ResponseBuilder.error(error_9, "Internal Server Error");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return CollectionService;
}());
exports.CollectionService = CollectionService;
//# sourceMappingURL=collections.service.js.map