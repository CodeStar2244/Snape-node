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
exports.AgentPaymentService = void 0;
var db_config_1 = require("../../db/db.config");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var axios_1 = __importDefault(require("axios"));
var transactions_1 = __importDefault(require("../../entities/transactions"));
var agentPlans_1 = __importDefault(require("../../entities/agentPlans"));
var moment_1 = __importDefault(require("moment"));
var AgentPaymentService = /** @class */ (function () {
    function AgentPaymentService() {
        var _this = this;
        this.initiatePayment = function (body, userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var paymentUrl, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.generatePaymentLink(body.amount, userDetails.email, userDetails.id)];
                    case 1:
                        paymentUrl = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ paymentUrl: paymentUrl })];
                    case 2:
                        error_1 = _a.sent();
                        throw responseBuilder_1.ResponseBuilder.error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.generatePaymentLink = function (amount, email, agentId) { return __awaiter(_this, void 0, void 0, function () {
            var transactions, additionalDetails, paymentDetails, headers, data, newTransaction, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transactions = db_config_1.AppDataSource.getRepository(transactions_1.default);
                        additionalDetails = {
                            agentId: agentId
                        };
                        paymentDetails = {
                            amount: amount,
                            email: email,
                            currency: process.env.CURRENCY,
                            callback_url: process.env.PAYSTACK_CALLBACK,
                            metadata: JSON.stringify(additionalDetails),
                            plan: "PLN_ulcpelooub9i6mi"
                        };
                        headers = {
                            authorization: "Bearer ".concat(process.env.PAYSTACK_SECRET)
                        };
                        return [4 /*yield*/, axios_1.default.post(process.env.PAYSTACK_API_URL + "initialize", paymentDetails, { headers: headers })];
                    case 1:
                        data = (_a.sent()).data.data;
                        newTransaction = transactions.create({
                            agentId: agentId,
                            amount: amount,
                            referenceId: data.reference,
                            transactionId: data.reference,
                        });
                        transactions.save(newTransaction);
                        return [2 /*return*/, data.authorization_url];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyTransaction = function (referenceId, userDetails, query) { return __awaiter(_this, void 0, void 0, function () {
            var transactionsRepo, transaction, headers, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        transactionsRepo = db_config_1.AppDataSource.getRepository(transactions_1.default);
                        return [4 /*yield*/, transactionsRepo.findOne({
                                where: {
                                    referenceId: referenceId
                                }
                            })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")];
                        }
                        headers = {
                            authorization: "Bearer ".concat(process.env.PAYSTACK_SECRET)
                        };
                        return [4 /*yield*/, axios_1.default.get(process.env.PAYSTACK_API_URL + "verify/".concat(transaction.referenceId), { headers: headers })];
                    case 2:
                        data = (_a.sent()).data.data;
                        if (!(data.status === "success")) return [3 /*break*/, 5];
                        return [4 /*yield*/, transactionsRepo.update(transaction.id, { status: data.status })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.updateAgentPlanDetails(transaction.agentId, transaction.planId, transaction.referenceId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                status: data.status,
                                isSuccess: true
                            })];
                    case 5:
                        if (data.status === "failed") {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                    status: data.status,
                                    isSuccess: false
                                })];
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        throw error_3;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.updateAgentPlanDetails = function (agentId, planId, referenceId) { return __awaiter(_this, void 0, void 0, function () {
            var agentPlansRepo, transactionsRepo, transaction, agentPlan, validTill, newAgentPlan, validTill, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        agentPlansRepo = db_config_1.AppDataSource.getRepository(agentPlans_1.default);
                        transactionsRepo = db_config_1.AppDataSource.getRepository(transactions_1.default);
                        return [4 /*yield*/, transactionsRepo.findOne({
                                where: {
                                    referenceId: referenceId,
                                    status: "Success"
                                }
                            })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction) {
                            return [2 /*return*/, responseBuilder_1.ResponseBuilder.badRequest("Transaction Not Found with this Reference Id")];
                        }
                        return [4 /*yield*/, agentPlansRepo.findOne({
                                where: {
                                    agentId: { id: agentId },
                                    planId: { id: planId }
                                }
                            })];
                    case 2:
                        agentPlan = _a.sent();
                        if (!!agentPlan) return [3 /*break*/, 4];
                        validTill = (0, moment_1.default)(transaction.succeededAt).add(1, "month");
                        newAgentPlan = agentPlansRepo.create({
                            agentId: agentId,
                            planId: planId,
                            validTill: validTill
                        });
                        return [4 /*yield*/, agentPlansRepo.save(newAgentPlan)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        validTill = (0, moment_1.default)(transaction.succeededAt).add(1, "month");
                        agentPlansRepo.update(agentPlan.id, { validTill: validTill });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return AgentPaymentService;
}());
exports.AgentPaymentService = AgentPaymentService;
//# sourceMappingURL=agentPayment.service.js.map