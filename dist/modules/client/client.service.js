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
exports.ClientService = void 0;
var db_config_1 = require("../../db/db.config");
var Collection_1 = __importStar(require("../../entities/Collection"));
var collectionDesign_1 = require("../../entities/collectionDesign");
var Files_1 = __importDefault(require("../../entities/Files"));
var responseBuilder_1 = require("../../helpers/responseBuilder");
var ClientService = /** @class */ (function () {
    function ClientService() {
        var _this = this;
        this.getCollectionByUrl = function (_a) {
            var url = _a.url, password = _a.password;
            return __awaiter(_this, void 0, void 0, function () {
                var collectionRepository, filesRepository, collection, filesCollection, passwordCheckCollection, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            collectionRepository = db_config_1.AppDataSource.getRepository(Collection_1.default);
                            filesRepository = db_config_1.AppDataSource.getRepository(Files_1.default);
                            return [4 /*yield*/, collectionRepository.createQueryBuilder("collections")
                                    .leftJoin("collection_tag_join", "tagsJoin", "tagsJoin.collectionsId=collections.id")
                                    .leftJoin("collection_tags", "tags", "tagsJoin.collectionTagsId=tags.id")
                                    .leftJoin("collection_design", "collectionDesign", "collectionDesign.collectionId=collections.id")
                                    .leftJoin("collection_themes", "themes", "collectionDesign.theme=themes.id")
                                    .select("collections.name", "name")
                                    .addSelect("collections.id", "id")
                                    .addSelect("collectionDesign.gridStyle", "gridStyle")
                                    .addSelect("collectionDesign.gridSpacing", "gridSpacing")
                                    .addSelect("collectionDesign.typography", "typography")
                                    .addSelect("themes.background", "background")
                                    .addSelect("themes.button", "button")
                                    .addSelect("themes.accent", "accent")
                                    .addSelect("collections.socialSharing", "socialSharing")
                                    .addSelect("collections.url", "url")
                                    .addSelect("collections.status", "status")
                                    .addSelect("collections.coverPhoto", "coverPhoto")
                                    .addSelect("collections.photos", "photos")
                                    .addSelect("collections.videos", "videos")
                                    .addSelect("collections.eventDate", "eventDate")
                                    .addSelect("collections.createdAt", "createdAt")
                                    .addSelect("collections.updatedAt", "updatedAt")
                                    .where("collections.url = :url", { url: url })
                                    .andWhere("collections.status = :status", { status: Collection_1.CollectionStatus.PUBLISH })
                                    .getRawOne()];
                        case 1:
                            collection = _b.sent();
                            if (!collection) {
                                return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Collection Not Found or collection not published", 404)];
                            }
                            return [4 /*yield*/, filesRepository.find({
                                    where: {
                                        collection: {
                                            id: collection.id
                                        }
                                    }
                                })];
                        case 2:
                            filesCollection = _b.sent();
                            return [4 /*yield*/, collectionRepository.findOneBy({ id: collection.id })];
                        case 3:
                            passwordCheckCollection = _b.sent();
                            if (passwordCheckCollection.password) {
                                return [2 /*return*/, this.collectionPasswordRequired(collection, passwordCheckCollection, password, filesCollection)];
                            }
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(__assign(__assign({ passwordRequired: false }, collection), { files: filesCollection }))];
                        case 4:
                            error_1 = _b.sent();
                            console.log(error_1);
                            throw responseBuilder_1.ResponseBuilder.error(error_1);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        this.collectionPasswordRequired = function (collection, passwordCheckCollection, password, filesCollection) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!password) {
                    return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ passwordRequired: true, name: collection.name, coverPhoto: collection.coverPhoto,
                            button: collection.button, accent: collection.accent, background: collection.background })];
                }
                if (passwordCheckCollection.password !== password) {
                    return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Wrong Password Provided")];
                }
                return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(__assign(__assign({ passwordRequired: false }, collection), { files: filesCollection }))];
            });
        }); };
        this.getCollectionDesign = function (userDetails, id) { return __awaiter(_this, void 0, void 0, function () {
            var collectionRepository, designRepo, collection, collectionDesign, error_2;
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
                        return [4 /*yield*/, designRepo.findOneBy({ collections: {
                                    id: id
                                } })];
                    case 2:
                        collectionDesign = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(collectionDesign)];
                    case 3:
                        error_2 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return ClientService;
}());
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map