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
var typeorm_1 = require("typeorm");
var AssetCategory = /** @class */ (function () {
    function AssetCategory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AssetCategory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AssetCategory.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AssetCategory.prototype, "colour", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
        __metadata("design:type", Date)
    ], AssetCategory.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AssetCategory.prototype, "updatedAt", void 0);
    AssetCategory = __decorate([
        (0, typeorm_1.Entity)("assetCategory", { schema: "public" })
    ], AssetCategory);
    return AssetCategory;
}());
exports.default = AssetCategory;
//# sourceMappingURL=assetCategory.js.map