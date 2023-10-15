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
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var studioClient_1 = __importDefault(require("./studioClient"));
var StudioQuotation = /** @class */ (function () {
    function StudioQuotation() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StudioQuotation.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "Draft" }),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)("jsonb", { default: {} }),
        __metadata("design:type", Object)
    ], StudioQuotation.prototype, "invoiceDetails", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioQuotation.prototype, "subTotalAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioQuotation.prototype, "totalAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioQuotation.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioQuotation.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "notes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], StudioQuotation.prototype, "validFor", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return studioClient_1.default; }, function (client) { return client.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", studioClient_1.default)
    ], StudioQuotation.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Object)
    ], StudioQuotation.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], StudioQuotation.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], StudioQuotation.prototype, "updatedAt", void 0);
    StudioQuotation = __decorate([
        (0, typeorm_1.Entity)("studioquotation", { schema: "public" })
    ], StudioQuotation);
    return StudioQuotation;
}());
exports.default = StudioQuotation;
//# sourceMappingURL=studioQuotation.js.map