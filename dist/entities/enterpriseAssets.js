"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetStatus = void 0;
var typeorm_1 = require("typeorm");
var assetRegistry_model_1 = require("../modules/assetRegistry/assetRegistry.model");
var enterPriseClient_1 = require("./enterPriseClient");
var AssetStatus;
(function (AssetStatus) {
    AssetStatus["ACTIVE"] = "Active";
    AssetStatus["FORSALE"] = "For Sale";
    AssetStatus["LOST"] = "Lost";
    AssetStatus["FORRENT"] = "For Rent";
})(AssetStatus = exports.AssetStatus || (exports.AssetStatus = {}));
var EnterpriseAssets = /** @class */ (function () {
    function EnterpriseAssets() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EnterpriseAssets.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EnterpriseAssets.prototype, "nickName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EnterpriseAssets.prototype, "deviceID", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
        }),
        __metadata("design:type", Number)
    ], EnterpriseAssets.prototype, "deviceAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: assetRegistry_model_1.AssetType,
            default: assetRegistry_model_1.AssetType.CAMERA,
        }),
        __metadata("design:type", String)
    ], EnterpriseAssets.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: AssetStatus,
            default: AssetStatus.ACTIVE,
        }),
        __metadata("design:type", String)
    ], EnterpriseAssets.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return enterPriseClient_1.EnterPriseClient; }, function (client) { return client.id; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", enterPriseClient_1.EnterPriseClient)
    ], EnterpriseAssets.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseAssets.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseAssets.prototype, "updatedAt", void 0);
    EnterpriseAssets = __decorate([
        (0, typeorm_1.Entity)("enterpriseassets", { schema: "public" })
    ], EnterpriseAssets);
    return EnterpriseAssets;
}());
exports.default = EnterpriseAssets;
//# sourceMappingURL=enterpriseAssets.js.map