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
exports.CollectionStatus = void 0;
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var CollectionStatus;
(function (CollectionStatus) {
    CollectionStatus["PUBLISH"] = "PUBLISH";
    CollectionStatus["HIDDEN"] = "HIDDEN";
})(CollectionStatus = exports.CollectionStatus || (exports.CollectionStatus = {}));
var PortFolios = /** @class */ (function () {
    function PortFolios() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PortFolios.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PortFolios.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: CollectionStatus,
            default: CollectionStatus.HIDDEN,
        }),
        __metadata("design:type", String)
    ], PortFolios.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], PortFolios.prototype, "photos", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], PortFolios.prototype, "videos", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            default: "https://snape-buckets.b-cdn.net/collectionphoto.jpg",
        }),
        __metadata("design:type", String)
    ], PortFolios.prototype, "coverPhoto", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], PortFolios.prototype, "size", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Object)
    ], PortFolios.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], PortFolios.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], PortFolios.prototype, "updatedAt", void 0);
    PortFolios = __decorate([
        (0, typeorm_1.Entity)("portfolios", { schema: "public" })
    ], PortFolios);
    return PortFolios;
}());
exports.default = PortFolios;
//# sourceMappingURL=Portfolio.js.map