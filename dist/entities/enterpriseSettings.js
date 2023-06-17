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
var enterPriseClient_1 = require("./enterPriseClient");
var EnterPriseSettings = /** @class */ (function () {
    function EnterPriseSettings() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EnterPriseSettings.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true
        }),
        __metadata("design:type", Number)
    ], EnterPriseSettings.prototype, "storage", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true
        }),
        __metadata("design:type", Number)
    ], EnterPriseSettings.prototype, "assets", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 3072
        }),
        __metadata("design:type", Number)
    ], EnterPriseSettings.prototype, "totalStorage", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return enterPriseClient_1.EnterPriseClient; }, function (client) { return client.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", enterPriseClient_1.EnterPriseClient)
    ], EnterPriseSettings.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
        __metadata("design:type", Date)
    ], EnterPriseSettings.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterPriseSettings.prototype, "updatedAt", void 0);
    EnterPriseSettings = __decorate([
        (0, typeorm_1.Entity)("enterprisesettings", { schema: "public" })
    ], EnterPriseSettings);
    return EnterPriseSettings;
}());
exports.default = EnterPriseSettings;
//# sourceMappingURL=enterpriseSettings.js.map