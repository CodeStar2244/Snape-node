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
exports.PortfolioController = void 0;
var portfolio_service_1 = require("./portfolio.service");
var PortfolioController = /** @class */ (function () {
    function PortfolioController() {
        var _this = this;
        this.portfolioService = new portfolio_service_1.PortfolioService();
        this.createPortfolio = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.createPortfolio(req.body, req.user)];
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
        this.getPortfolios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, search, order, sort, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, search = _a.search, order = _a.order, sort = _a.sort;
                        return [4 /*yield*/, this.portfolioService.getPortfolios(req.user, search, order, sort)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(error_2.code).json(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolioByID = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.getPortfolioByID(req.user, req.params.id)];
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
        this.getPortfolioFiles = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, search, sort, order, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, search = _a.search, sort = _a.sort, order = _a.order;
                        return [4 /*yield*/, this.portfolioService.getPortfolioFiles(req.user, req.params.id, search, sort, order)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(error_4.code).json(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPortfolioFilesName = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.getPortfolioFilesName(req.user, req.params.id)];
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
        this.changeCoverPhoto = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.changeCoverPhoto(req.params, req.body, req.user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(error_6.code).json(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletePortfolio = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.deletePortfolio(req.user, req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, res.status(error_7.code).json(error_7)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFiles = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var ids, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ids = req.body.ids;
                        return [4 /*yield*/, this.portfolioService.deleteFiles(req.user, req.params.id, ids)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, res.status(error_8.code).json(error_8)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.filesUpload = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.uploadFiles(req.params, req.body, req.user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.status(result.code).json(result)];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(error_9.code).json(error_9)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addVideoLink = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.portfolioService.addVideoLink(req.params, req.body, req.user)];
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
    }
    return PortfolioController;
}());
exports.PortfolioController = PortfolioController;
//# sourceMappingURL=portfolio.controller.js.map