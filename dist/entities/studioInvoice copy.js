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
var StudioInvoice = /** @class */ (function () {
    function StudioInvoice() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StudioInvoice.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioInvoice.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioInvoice.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], StudioInvoice.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "Draft" }),
        __metadata("design:type", String)
    ], StudioInvoice.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)("jsonb", { default: {} }),
        __metadata("design:type", Object)
    ], StudioInvoice.prototype, "invoiceDetails", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioInvoice.prototype, "subTotalAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioInvoice.prototype, "totalAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioInvoice.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], StudioInvoice.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], StudioInvoice.prototype, "notes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Date)
    ], StudioInvoice.prototype, "paymentDue", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Date)
    ], StudioInvoice.prototype, "dueOnReceipt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return studioClient_1.default; }, function (client) { return client.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", studioClient_1.default)
    ], StudioInvoice.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Object)
    ], StudioInvoice.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], StudioInvoice.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], StudioInvoice.prototype, "updatedAt", void 0);
    StudioInvoice = __decorate([
        (0, typeorm_1.Entity)("studioinvoice", { schema: "public" })
    ], StudioInvoice);
    return StudioInvoice;
}());
exports.default = StudioInvoice;
//# sourceMappingURL=studioInvoice%20copy.js.map