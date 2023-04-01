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
exports.Tblbooking = void 0;
var typeorm_1 = require("typeorm");
var Tblclient_1 = require("./Tblclient");
var Tblbooking = /** @class */ (function () {
    function Tblbooking() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "bookingno",
            nullable: true,
            length: 20,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "bookingno", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "bookingdatetime",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "bookingdatetime", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "session", nullable: true }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "session", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "startdatetime",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "startdatetime", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "enddatetime",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "enddatetime", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "shoottime",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "shoottime", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address1",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "address1", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address2",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "address2", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "latitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "longitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "bookingstatusid", nullable: true }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "bookingstatusid", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblclient_1.Tblclient; }, function (client) { return client.id; }, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "clientid" }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "clientid", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "agentid", nullable: true }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "agentid", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "subtotal",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "subtotal", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "discount",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "tax",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "totalamount",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "totalamount", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", {
            name: "clientrating",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "clientrating", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", {
            name: "agentrating",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "agentrating", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "speciality", nullable: true }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "speciality", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "mediacategories",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "mediacategories", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "paymentmode",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "paymentmode", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "paymentstatus",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "paymentstatus", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "transactionid",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "transactionid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "agentcancellationreason",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "agentcancellationreason", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "clientcancellationreason",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "clientcancellationreason", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "cancellationfee",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "cancellationfee", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "refundamount",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "refundamount", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblbooking.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "updatedondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "shootingstartdatetime",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbooking.prototype, "shootingstartdatetime", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "head", nullable: true, length: 100 }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "head", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "message", nullable: true, length: 500 }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "tiptransactionid",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "tiptransactionid", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "tipamount",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "tipamount", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "medialink",
            nullable: true,
            length: 200,
            default: function () { return "''"; },
        }),
        __metadata("design:type", String)
    ], Tblbooking.prototype, "medialink", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "transportationcharge",
            nullable: true,
            default: function () { return "0"; },
        }),
        __metadata("design:type", Number)
    ], Tblbooking.prototype, "transportationcharge", void 0);
    Tblbooking = __decorate([
        (0, typeorm_1.Entity)("tblbooking", { schema: "public" })
    ], Tblbooking);
    return Tblbooking;
}());
exports.Tblbooking = Tblbooking;
//# sourceMappingURL=Tblbooking.js.map