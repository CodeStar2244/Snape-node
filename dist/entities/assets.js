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
var Tblagent_1 = require("./Tblagent");
var AssetStatus;
(function (AssetStatus) {
    AssetStatus["ACTIVE"] = "Active";
    AssetStatus["FORSALE"] = "For Sale";
    AssetStatus["LOST"] = "Lost";
    AssetStatus["FORRENT"] = "For Rent";
})(AssetStatus = exports.AssetStatus || (exports.AssetStatus = {}));
var Assets = /** @class */ (function () {
    function Assets() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Assets.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Assets.prototype, "nickName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Assets.prototype, "deviceID", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0
        }),
        __metadata("design:type", Number)
    ], Assets.prototype, "deviceAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: assetRegistry_model_1.AssetType,
            default: assetRegistry_model_1.AssetType.CAMERA
        }),
        __metadata("design:type", String)
    ], Assets.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: AssetStatus,
            default: AssetStatus.ACTIVE
        }),
        __metadata("design:type", String)
    ], Assets.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Tblagent_1.Tblagent)
    ], Assets.prototype, "agentId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
        __metadata("design:type", Date)
    ], Assets.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], Assets.prototype, "updatedAt", void 0);
    Assets = __decorate([
        (0, typeorm_1.Entity)("assets", { schema: "public" })
    ], Assets);
    return Assets;
}());
exports.default = Assets;
//# sourceMappingURL=assets.js.map