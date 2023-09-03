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
exports.EnterPriseClient = void 0;
var typeorm_1 = require("typeorm");
var Tblrole_1 = require("./Tblrole");
var EnterPriseClient = /** @class */ (function () {
    function EnterPriseClient() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], EnterPriseClient.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "name",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "email", nullable: true, length: 150 }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "password",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "countrycode",
            nullable: true,
            length: 10,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "countrycode", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "phone",
            nullable: true,
            unique: true,
            length: 30,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "otpverification",
            nullable: true,
            default: function () { return "false"; },
        }),
        __metadata("design:type", Boolean)
    ], EnterPriseClient.prototype, "otpverification", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "facebookid",
            nullable: true,
            length: 400,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "facebookid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "googleid",
            nullable: true,
            length: 400,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "googleid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "fcmtoken",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "fcmtoken", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "latitude",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], EnterPriseClient.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "longitude",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], EnterPriseClient.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], EnterPriseClient.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "registrationNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "userName", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "gender", nullable: true }),
        __metadata("design:type", Number)
    ], EnterPriseClient.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "birthdate",
            nullable: true,
            length: 30,
        }),
        __metadata("design:type", String)
    ], EnterPriseClient.prototype, "birthdate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblrole_1.Tblrole; }, function (tblrole) { return tblrole.tblclients; }),
        (0, typeorm_1.JoinColumn)([{ name: "roleid", referencedColumnName: "id" }]),
        __metadata("design:type", Tblrole_1.Tblrole)
    ], EnterPriseClient.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterPriseClient.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterPriseClient.prototype, "updatedAt", void 0);
    EnterPriseClient = __decorate([
        (0, typeorm_1.Entity)("enterPriseClient", { schema: "public" })
    ], EnterPriseClient);
    return EnterPriseClient;
}());
exports.EnterPriseClient = EnterPriseClient;
//# sourceMappingURL=enterPriseClient.js.map