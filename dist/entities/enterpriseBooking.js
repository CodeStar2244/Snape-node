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
exports.EnterpriseBooking = void 0;
var typeorm_1 = require("typeorm");
var enterPriseClient_1 = require("./enterPriseClient");
var Tblagent_1 = require("./Tblagent");
var EnterpriseBooking = /** @class */ (function () {
    function EnterpriseBooking() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "bookingDate",
        }),
        __metadata("design:type", Date)
    ], EnterpriseBooking.prototype, "bookingDate", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "hours", nullable: true }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "hours", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "bookingStartDateTime",
        }),
        __metadata("design:type", Date)
    ], EnterpriseBooking.prototype, "bookingStartDateTime", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "bookingEndDateTime",
        }),
        __metadata("design:type", Date)
    ], EnterpriseBooking.prototype, "bookingEndDateTime", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address1",
            length: 500,
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "address1", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address2",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "address2", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "latitude",
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "longitude",
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "bookingstatusid" }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "bookingstatusid", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return enterPriseClient_1.EnterPriseClient; }, function (client) { return client.id; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", enterPriseClient_1.EnterPriseClient)
    ], EnterpriseBooking.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Tblagent_1.Tblagent)
    ], EnterpriseBooking.prototype, "agentId", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", {
            name: "clientrating",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "clientrating", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", {
            name: "agentrating",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "agentrating", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "speciality" }),
        __metadata("design:type", Number)
    ], EnterpriseBooking.prototype, "speciality", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "agentcancellationreason",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "agentcancellationreason", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "clientcancellationreason",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "clientcancellationreason", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp without time zone" }),
        __metadata("design:type", Date)
    ], EnterpriseBooking.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp without time zone" }),
        __metadata("design:type", Date)
    ], EnterpriseBooking.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "head", nullable: true, length: 100 }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "head", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "message", nullable: true, length: 500 }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "medialink",
            nullable: true,
            length: 200,
            default: function () { return "''"; },
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "medialink", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "mediacategories",
            nullable: true,
            length: 500,
            default: function () { return "''"; },
        }),
        __metadata("design:type", String)
    ], EnterpriseBooking.prototype, "mediacategories", void 0);
    EnterpriseBooking = __decorate([
        (0, typeorm_1.Entity)("enterpriseBooking", { schema: "public" })
    ], EnterpriseBooking);
    return EnterpriseBooking;
}());
exports.EnterpriseBooking = EnterpriseBooking;
//# sourceMappingURL=enterpriseBooking.js.map