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
exports.DashboardService = void 0;
var moment_1 = __importDefault(require("moment"));
var constants_1 = require("../../config/constants");
var db_config_1 = require("../../db/db.config");
var Tblbooking_1 = require("../../entities/Tblbooking");
var responseBuilder_1 = require("../../helpers/responseBuilder");
var DashboardService = /** @class */ (function () {
    function DashboardService() {
        var _this = this;
        this.getSummary = function (userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var customDate, todayDate, bookingRepo, clients, photoGraphy, videoGraphy, revenue, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        customDate = (0, moment_1.default)().subtract(7, "days").format(constants_1.TIME_STAMP_FORMAT);
                        todayDate = (0, moment_1.default)().endOf("day").format(constants_1.TIME_STAMP_FORMAT);
                        bookingRepo = db_config_1.AppDataSource.getRepository(Tblbooking_1.Tblbooking);
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"enddatetime\" >= '".concat(customDate, "'"))
                                .andWhere("\"bookings\".\"enddatetime\" <= '".concat(todayDate, "'"))
                                .andWhere({ paymentstatus: constants_1.PAYMENT_STATUS.SUCESS })
                                .andWhere({ bookingstatusid: 10 })
                                .groupBy("clientid,bookings.id")
                                .getCount()];
                    case 1:
                        clients = _a.sent();
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"enddatetime\" >= '".concat(customDate, "'"))
                                .andWhere("\"bookings\".\"enddatetime\" <= '".concat(todayDate, "'"))
                                .andWhere("(speciality=3 OR speciality=2)")
                                .andWhere({ paymentstatus: constants_1.PAYMENT_STATUS.SUCESS })
                                .andWhere({ bookingstatusid: 10 })
                                .getCount()];
                    case 2:
                        photoGraphy = _a.sent();
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"enddatetime\" >= '".concat(customDate, "'"))
                                .andWhere("\"bookings\".\"enddatetime\" <= '".concat(todayDate, "'"))
                                .andWhere("(speciality=3 OR speciality=1)")
                                .andWhere({ paymentstatus: constants_1.PAYMENT_STATUS.SUCESS })
                                .andWhere({ bookingstatusid: 10 })
                                .getCount()];
                    case 3:
                        videoGraphy = _a.sent();
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .select("SUM(bookings.totalamount)", "totalamount")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"enddatetime\" >= '".concat(customDate, "'"))
                                .andWhere("\"bookings\".\"enddatetime\" <= '".concat(todayDate, "'"))
                                .andWhere({ paymentstatus: constants_1.PAYMENT_STATUS.SUCESS })
                                .andWhere({ bookingstatusid: 10 })
                                .getRawOne()];
                    case 4:
                        revenue = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({
                                clients: clients,
                                photoGraphy: photoGraphy,
                                videoGraphy: videoGraphy,
                                revenue: (revenue === null || revenue === void 0 ? void 0 : revenue.totalamount) ? revenue.totalamount : 0,
                            })];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.recentCustomers = function (userDetails) { return __awaiter(_this, void 0, void 0, function () {
            var customDate, todayDate, bookingRepo, recentCustomers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        customDate = (0, moment_1.default)().subtract(7, "days").format(constants_1.TIME_STAMP_FORMAT);
                        todayDate = (0, moment_1.default)().endOf("day").format(constants_1.TIME_STAMP_FORMAT);
                        bookingRepo = db_config_1.AppDataSource.getRepository(Tblbooking_1.Tblbooking);
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .innerJoinAndSelect("bookings.clientid", "clients")
                                .innerJoin("tblimages", "images", "bookings.clientid = images.entityid AND entitytype = 'client'")
                                .select("bookings.startdatetime", "bookingStartTime")
                                .addSelect("bookings.enddatetime", "bookingEndTime")
                                .addSelect("bookings.session", "session")
                                .addSelect("clients.firstname", "clientfirstName")
                                .addSelect("clients.lastname", "clientLastName")
                                .addSelect("images.imagepath", "profile")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"enddatetime\" >= '".concat(customDate, "'"))
                                .andWhere("\"bookings\".\"enddatetime\" <= '".concat(todayDate, "'"))
                                .andWhere({ bookingstatusid: 10 })
                                .getRawMany()];
                    case 1:
                        recentCustomers = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ recentCustomers: recentCustomers })];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.upcomingBookings = function (userDetails, date) { return __awaiter(_this, void 0, void 0, function () {
            var startDate, endDate, bookingRepo, recentCustomers, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        startDate = (0, moment_1.default)(date).startOf("day").format(constants_1.TIME_STAMP_FORMAT);
                        endDate = (0, moment_1.default)(date).endOf("day").format(constants_1.TIME_STAMP_FORMAT);
                        bookingRepo = db_config_1.AppDataSource.getRepository(Tblbooking_1.Tblbooking);
                        return [4 /*yield*/, bookingRepo
                                .createQueryBuilder("bookings")
                                .innerJoinAndSelect("bookings.clientid", "clients")
                                .innerJoin("tblimages", "images", "bookings.clientid = images.entityid AND entitytype = 'client'")
                                .select("bookings.startdatetime", "bookingStartTime")
                                .addSelect("bookings.id", "id")
                                .addSelect("bookings.enddatetime", "bookingEndTime")
                                .addSelect("bookings.session", "session")
                                .addSelect("clients.firstname", "clientfirstName")
                                .addSelect("clients.lastname", "clientLastName")
                                .addSelect("bookings.address1", "address1")
                                .addSelect("bookings.address2", "address2")
                                .addSelect("bookings.latitude", "latitude")
                                .addSelect("bookings.longitude", "longitude")
                                .addSelect("bookings.totalamount", "totalamount")
                                .addSelect("images.imagepath", "profile")
                                .where({ agentid: userDetails.id })
                                .andWhere("\"bookings\".\"startdatetime\" >= '".concat(startDate, "'"))
                                .andWhere("\"bookings\".\"startdatetime\" <= '".concat(endDate, "'"))
                                .andWhere({ bookingstatusid: 3 })
                                .getRawMany()];
                    case 1:
                        recentCustomers = _a.sent();
                        return [2 /*return*/, responseBuilder_1.ResponseBuilder.data({ recentCustomers: recentCustomers })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map