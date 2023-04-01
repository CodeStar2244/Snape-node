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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetStatus = void 0;
var typeorm_1 = require("typeorm");
var assetCategory_1 = __importDefault(require("./assetCategory"));
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
    ], Assets.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Assets.prototype, "imeiNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Assets.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: AssetStatus
        }),
        __metadata("design:type", String)
    ], Assets.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return assetCategory_1.default; }, function (category) { return category.id; }),
        __metadata("design:type", assetCategory_1.default)
    ], Assets.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
        __metadata("design:type", Object)
    ], Assets.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Object)
    ], Assets.prototype, "updatedAt", void 0);
    Assets = __decorate([
        (0, typeorm_1.Entity)("assets", { schema: "public" })
    ], Assets);
    return Assets;
}());
exports.default = Assets;
//# sourceMappingURL=assets.js.map