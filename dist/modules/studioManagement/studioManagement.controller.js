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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioManagementController = void 0;
var studioManagement_service_1 = require("./studioManagement.service");
var StudioManagementController = /** @class */ (function () {
    function StudioManagementController() {
        var _this = this;
        this.clientService = new studioManagement_service_1.StudioManagementService();
        this.createClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.createClient(userDetails, req.body)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(error_1.code).json(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, search, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        search = req.query.search;
                        return [4 /*yield*/, this.clientService.getClient(userDetails, search)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(error_2.code).json(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSingleClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.getClientDetails(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(error_3.code).json(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.editClient(req.params, req.body, userDetails)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(error_4.code).json(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.deleteClient(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(error_5.code).json(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addSpeciality = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var params, user, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = req.body;
                        user = req.user;
                        return [4 /*yield*/, this.clientService.addSpeciality(params, user)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //Profile
        this.getSpeciality = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clientService.getSpeciality(req.user)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editSpeciality = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clientService.editSpeciality(req.params, req.body)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSpeciality = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clientService.deleteSpeciality(req.params)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTemplates = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, type, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        type = req.query.type;
                        return [4 /*yield*/, this.clientService.getTemplates(userDetails, type)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, res.status(error_10.code).json(error_10)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createTemplate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, params, result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        params = req.body;
                        return [4 /*yield*/, this.clientService.createTemplates(userDetails, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_11 = _a.sent();
                        return [2 /*return*/, res.status(error_11.code).json(error_11)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createQuestionnaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, params, result, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        params = req.body;
                        return [4 /*yield*/, this.clientService.createQuestionnaries(userDetails, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_12 = _a.sent();
                        return [2 /*return*/, res.status(error_12.code).json(error_12)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createInvoice = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, params, result, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        params = req.body;
                        return [4 /*yield*/, this.clientService.createInvoice(userDetails, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_13 = _a.sent();
                        return [2 /*return*/, res.status(error_13.code).json(error_13)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInvoices = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.getInvoices(userDetails)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_14 = _a.sent();
                        return [2 /*return*/, res.status(error_14.code).json(error_14)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInvoice = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.getInvoice(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_15 = _a.sent();
                        return [2 /*return*/, res.status(error_15.code).json(error_15)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editInvoice = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.editInvoice(req.params, req.body, userDetails)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteInvoice = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.deleteInvoice(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_17 = _a.sent();
                        return [2 /*return*/, res.status(error_17.code).json(error_17)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createQuotation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, params, result, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        params = req.body;
                        return [4 /*yield*/, this.clientService.createQuotation(userDetails, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_18 = _a.sent();
                        return [2 /*return*/, res.status(error_18.code).json(error_18)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getQuotations = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.getQuotations(userDetails)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_19 = _a.sent();
                        return [2 /*return*/, res.status(error_19.code).json(error_19)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getQuotation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.getQuotation(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_20 = _a.sent();
                        return [2 /*return*/, res.status(error_20.code).json(error_20)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editQuotation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.editQuotation(req.params, req.body, userDetails)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_21 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteQuotation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.deleteQuotation(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_22 = _a.sent();
                        return [2 /*return*/, res.status(error_22.code).json(error_22)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createBooking = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, params, result, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        params = req.body;
                        return [4 /*yield*/, this.clientService.createBooking(userDetails, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_23 = _a.sent();
                        return [2 /*return*/, res.status(error_23.code).json(error_23)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getBookings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.getBookings(userDetails)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_24 = _a.sent();
                        return [2 /*return*/, res.status(error_24.code).json(error_24)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getBooking = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.getBooking(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_25 = _a.sent();
                        return [2 /*return*/, res.status(error_25.code).json(error_25)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editBooking = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clientService.editBooking(req.params, req.body)];
                    case 1:
                        result = _a.sent();
                        res.status(result.code).json((result === null || result === void 0 ? void 0 : result.result) || (result === null || result === void 0 ? void 0 : result.error));
                        return [3 /*break*/, 3];
                    case 2:
                        error_26 = _a.sent();
                        res.status(500).json({ code: 500, message: "INTERNAL_SERVER_ERROR" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBooking = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.deleteBooking(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_27 = _a.sent();
                        return [2 /*return*/, res.status(error_27.code).json(error_27)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getQuestionnaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, result, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        return [4 /*yield*/, this.clientService.getQuestionnaries(userDetails)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_28 = _a.sent();
                        return [2 /*return*/, res.status(error_28.code).json(error_28)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClientQuestionnaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.getClientQuestionnaries(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_29 = _a.sent();
                        return [2 /*return*/, res.status(error_29.code).json(error_29)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteQuestionnaries = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, id, result, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userDetails = req.user;
                        id = req.params.id;
                        return [4 /*yield*/, this.clientService.deleteQuestionnaries(userDetails, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_30 = _a.sent();
                        return [2 /*return*/, res.status(error_30.code).json(error_30)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return StudioManagementController;
}());
exports.StudioManagementController = StudioManagementController;
//# sourceMappingURL=studioManagement.controller.js.map