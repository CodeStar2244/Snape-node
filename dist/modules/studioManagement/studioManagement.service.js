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
exports.StudioManagementService = void 0;
var db_config_1 = require("../../db/db.config");
var studioClient_1 = __importDefault(require("../../entities/studioClient"));
var responseBuilder_1 = require("../../helpers/responseBuilder");
var StudioManagementService = /** @class */ (function () {
    function StudioManagementService() {
        var _this = this;
        this.createClient = function (userDetails, body) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, studioClient, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.save(__assign(__assign({}, body), { createdBy: userDetails.id }))];
                    case 1:
                        studioClient = _a.sent();
                        console.log(userDetails, '----userDetails-----');
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioClient, "Studio Client created SuccessFully")];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClient = function (userDetails, search) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, query, studioclient, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.createQueryBuilder("studioclient")
                                .select("studioclient.name", "name")
                                .addSelect("studioclient.email", "email")
                                .addSelect("studioclient.phone", "phone")
                                .where("studioclient.createdBy = :agentId", { agentId: userDetails.id })
                                .loadRelationIdAndMap("agentId", "studioclient.createdBy")];
                    case 1:
                        query = _a.sent();
                        if (search) {
                            query.andWhere('studioclient.name ILIKE :name', { name: "%".concat(search, "%") });
                            query.andWhere('studioclient.email ILIKE :name', { name: "%".concat(search, "%") });
                        }
                        return [4 /*yield*/, query.getRawMany()];
                    case 2:
                        studioclient = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioclient)];
                    case 3:
                        error_2 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getClientDetails = function (userDetails, clientId) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, studioclient, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.findOne({
                                where: {
                                    id: clientId, createdBy: userDetails.id
                                }
                            })];
                    case 1:
                        studioclient = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioclient)];
                    case 2:
                        error_3 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteClient = function (userDetails, clientId) { return __awaiter(_this, void 0, void 0, function () {
            var studioClientRepository, studioClient, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        studioClientRepository = db_config_1.AppDataSource.getRepository(studioClient_1.default);
                        return [4 /*yield*/, studioClientRepository.findOne({
                                where: {
                                    id: clientId, createdBy: userDetails.id
                                }
                            })];
                    case 1:
                        studioClient = _a.sent();
                        if (!studioClient) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Client Not Found", 404)];
                        }
                        return [4 /*yield*/, studioClientRepository.delete({ id: clientId })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data(studioClient)];
                    case 3:
                        error_4 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_4);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return StudioManagementService;
}());
exports.StudioManagementService = StudioManagementService;
//# sourceMappingURL=studioManagement.service.js.map