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
exports.Cron = void 0;
var cron_1 = require("cron");
var studioManagement_service_1 = require("..//modules/studioManagement/studioManagement.service");
var db_config_1 = require("../db/db.config");
var agentPlans_1 = __importDefault(require("../entities/agentPlans"));
var typeorm_1 = require("typeorm");
var agentSettings_1 = __importDefault(require("../entities/agentSettings"));
var plans_1 = __importDefault(require("../entities/plans"));
var Cron = /** @class */ (function () {
    function Cron() {
        var _this = this;
        this.dailyCron = function () {
            new cron_1.CronJob("1 0 * * *", _this.cronFunctions, null, true);
        };
        this.cronFunctions = function () {
            console.log("Midnight Function RUN");
            _this.studioManagementService.cronDuePayment();
            _this.expirePlans();
        };
        this.expirePlans = function () { return __awaiter(_this, void 0, void 0, function () {
            var agentPlansRepo, agentSettingRepo, planRepo, dateNow, plansNeedToExpire, _i, plansNeedToExpire_1, plan, agentSetting, plansNeedToCheck, _a, plansNeedToCheck_1, plan, agentSetting, planDetail, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        agentPlansRepo = db_config_1.AppDataSource.getRepository(agentPlans_1.default);
                        agentSettingRepo = db_config_1.AppDataSource.getRepository(agentSettings_1.default);
                        planRepo = db_config_1.AppDataSource.getRepository(plans_1.default);
                        dateNow = new Date();
                        return [4 /*yield*/, agentPlansRepo.find({
                                where: {
                                    validTill: (0, typeorm_1.LessThan)(dateNow),
                                    isExpired: false,
                                },
                                relations: ["agentId"],
                            })];
                    case 1:
                        plansNeedToExpire = _b.sent();
                        _i = 0, plansNeedToExpire_1 = plansNeedToExpire;
                        _b.label = 2;
                    case 2:
                        if (!(_i < plansNeedToExpire_1.length)) return [3 /*break*/, 7];
                        plan = plansNeedToExpire_1[_i];
                        return [4 /*yield*/, agentSettingRepo.findOne({
                                where: {
                                    agentId: {
                                        id: plan.agentId.id,
                                    },
                                },
                            })];
                    case 3:
                        agentSetting = _b.sent();
                        console.log(plan.agentId.id, "id");
                        console.log(agentSetting, "settings");
                        return [4 /*yield*/, agentSettingRepo.update(agentSetting.id, {
                                totalStorage: 3072,
                                currentPlan: { id: 1 },
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, agentPlansRepo.update(plan.id, {
                                isExpired: true,
                            })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [4 /*yield*/, agentPlansRepo.find({
                            where: {
                                validTill: (0, typeorm_1.MoreThan)(dateNow),
                                isExpired: false,
                            },
                            relations: ["agentId", "planId"],
                        })];
                    case 8:
                        plansNeedToCheck = _b.sent();
                        _a = 0, plansNeedToCheck_1 = plansNeedToCheck;
                        _b.label = 9;
                    case 9:
                        if (!(_a < plansNeedToCheck_1.length)) return [3 /*break*/, 14];
                        plan = plansNeedToCheck_1[_a];
                        return [4 /*yield*/, agentSettingRepo.findOne({
                                where: {
                                    agentId: {
                                        id: plan.agentId.id,
                                    },
                                },
                            })];
                    case 10:
                        agentSetting = _b.sent();
                        return [4 /*yield*/, planRepo.findOne({
                                where: {
                                    id: plan.planId.id,
                                },
                            })];
                    case 11:
                        planDetail = _b.sent();
                        return [4 /*yield*/, agentSettingRepo.update(agentSetting.id, {
                                totalStorage: planDetail.storageInPlan,
                                currentPlan: planDetail,
                            })];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13:
                        _a++;
                        return [3 /*break*/, 9];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_1 = _b.sent();
                        console.log(error_1, "erorr");
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        }); };
        this.dailyCron();
        this.studioManagementService = new studioManagement_service_1.StudioManagementService();
    }
    return Cron;
}());
exports.Cron = Cron;
//# sourceMappingURL=Cron.js.map