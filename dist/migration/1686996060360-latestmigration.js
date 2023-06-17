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
exports.latestmigration1686996060360 = void 0;
var latestmigration1686996060360 = /** @class */ (function () {
    function latestmigration1686996060360() {
        this.name = 'latestmigration1686996060360';
    }
    latestmigration1686996060360.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"firstname\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"lastname\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"name\" character varying(100)")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"createdAt\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"createdAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"updatedAt\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"updatedAt\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD CONSTRAINT \"FK_0f77f0a7240e46f56a011fbcec7\" FOREIGN KEY (\"roleid\") REFERENCES \"tblrole\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    latestmigration1686996060360.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP CONSTRAINT \"FK_0f77f0a7240e46f56a011fbcec7\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"transportationcharge\" SET DEFAULT '0'")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"refundamount\" SET DEFAULT '0'")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"cancellationfee\" SET DEFAULT '0'")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"agentrating\" SET DEFAULT '0'")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"clientrating\" SET DEFAULT '0'")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"totalamount\" SET DEFAULT '0'")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"tax\" SET DEFAULT '0'")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"discount\" SET DEFAULT '0'")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"tblbooking\" ALTER COLUMN \"subtotal\" SET DEFAULT '0'")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"updatedAt\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"updatedAt\" TIMESTAMP")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"createdAt\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"createdAt\" TIMESTAMP")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"agentsettings\" ALTER COLUMN \"totalStorage\" TYPE double precision")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"agentsettings\" ALTER COLUMN \"assets\" TYPE double precision")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"agentsettings\" ALTER COLUMN \"storage\" TYPE double precision")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" DROP COLUMN \"name\"")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"lastname\" character varying(100)")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enterPriseClient\" ADD \"firstname\" character varying(100)")];
                    case 20:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return latestmigration1686996060360;
}());
exports.latestmigration1686996060360 = latestmigration1686996060360;
//# sourceMappingURL=1686996060360-latestmigration.js.map