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
exports.WebhookService = void 0;
var moment_1 = __importDefault(require("moment"));
var constants_1 = require("../..//config/constants");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var db_config_1 = require("../../db/db.config");
var agentPlans_1 = __importDefault(require("../../entities/agentPlans"));
var transactions_1 = __importDefault(require("../../entities/transactions"));
var agentSettings_1 = __importDefault(require("../../entities/agentSettings"));
var WebhookService = /** @class */ (function () {
    function WebhookService() {
        var _this = this;
        this.updateAgentStorage = function (agent, storage, plan) { return __awaiter(_this, void 0, void 0, function () {
            var agentSettingsRepo, agentSetting, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        agentSettingsRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        return [4 /*yield*/, agentSettingsRepo.findOne({
                                where: {
                                    agentId: {
                                        id: agent,
                                    },
                                },
                            })];
                    case 1:
                        agentSetting = _a.sent();
                        return [4 /*yield*/, agentSettingsRepo.update(agentSetting.id, {
                                totalStorage: storage,
                                currentPlan: plan,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateAgentPlanDetails = function (agentId, planId, referenceId) { return __awaiter(_this, void 0, void 0, function () {
            var agentPlansRepo, transactionsRepo, transaction, agentPlan, validTill, newAgentPlan, validTill, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        agentPlansRepo = db_config_1.AppDataSource.getRepository(agentPlans_1.default);
                        transactionsRepo = db_config_1.AppDataSource.getRepository(transactions_1.default);
                        return [4 /*yield*/, transactionsRepo.findOne({
                                where: {
                                    referenceId: referenceId,
                                    status: "success",
                                },
                            })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")];
                        }
                        return [4 /*yield*/, agentPlansRepo.findOne({
                                where: {
                                    agentId: { id: agentId.id },
                                    planId: { id: planId.id },
                                },
                            })];
                    case 2:
                        agentPlan = _a.sent();
                        if (!!agentPlan) return [3 /*break*/, 4];
                        validTill = (0, moment_1.default)(transaction.succeededAt).add(1, "month");
                        newAgentPlan = agentPlansRepo.create({
                            agentId: agentId.id,
                            planId: planId.id,
                            validTill: validTill,
                        });
                        return [4 /*yield*/, agentPlansRepo.save(newAgentPlan)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        validTill = (0, moment_1.default)(transaction.succeededAt).add(1, "month");
                        agentPlansRepo.update(agentPlan.id, { validTill: validTill });
                        _a.label = 5;
                    case 5:
                        this.updateAgentStorage(agentId.id, planId.storageInPlan, planId);
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw error_2;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    WebhookService.prototype.acceptTransaction = function (body) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var referenceId, transactionsRepo, transaction, error_3;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 7, , 8]);
                        referenceId = (_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.reference;
                        transactionsRepo = db_config_1.AppDataSource.getRepository(transactions_1.default);
                        return [4 /*yield*/, transactionsRepo.findOne({
                                where: {
                                    referenceId: referenceId,
                                    status: "ongoing",
                                },
                                relations: ["agentId", "planId"],
                            })];
                    case 1:
                        transaction = _h.sent();
                        if (!transaction) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")];
                        }
                        if (!(((_b = body === null || body === void 0 ? void 0 : body.data) === null || _b === void 0 ? void 0 : _b.status) === constants_1.PAYSTACK_STATUS.SUCCESS)) return [3 /*break*/, 4];
                        return [4 /*yield*/, transactionsRepo.update(transaction.id, {
                                status: (_c = body === null || body === void 0 ? void 0 : body.data) === null || _c === void 0 ? void 0 : _c.status,
                                succeededAt: (0, moment_1.default)((_d = body === null || body === void 0 ? void 0 : body.data) === null || _d === void 0 ? void 0 : _d.paid_at),
                            })];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, this.updateAgentPlanDetails(transaction.agentId, transaction.planId, transaction.referenceId)];
                    case 3:
                        _h.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(((_e = body === null || body === void 0 ? void 0 : body.data) === null || _e === void 0 ? void 0 : _e.status) === constants_1.PAYSTACK_STATUS.FAILED)) return [3 /*break*/, 6];
                        return [4 /*yield*/, transactionsRepo.update(transaction.id, {
                                status: (_f = body === null || body === void 0 ? void 0 : body.data) === null || _f === void 0 ? void 0 : _f.status,
                                succeededAt: (0, moment_1.default)((_g = body === null || body === void 0 ? void 0 : body.data) === null || _g === void 0 ? void 0 : _g.paid_at),
                            })];
                    case 5:
                        _h.sent();
                        _h.label = 6;
                    case 6: return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ msg: true })];
                    case 7:
                        error_3 = _h.sent();
                        console.log(error_3, "------error----");
                        throw error_3;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return WebhookService;
}());
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map