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
exports.Tblagent = void 0;
var typeorm_1 = require("typeorm");
var Tblrole_1 = require("./Tblrole");
var Tblagent = /** @class */ (function () {
    function Tblagent() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "firstname",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "firstname", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "lastname",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "lastname", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "email", nullable: true, length: 150 }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "password",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "iv", nullable: true, length: 400 }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "iv", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "envkey", nullable: true, length: 400 }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "envkey", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "countrycode",
            nullable: true,
            length: 10,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "countrycode", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "phone",
            nullable: true,
            unique: true,
            length: 30,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "otpverification",
            nullable: true,
            default: function () { return "false"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblagent.prototype, "otpverification", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "facebookid",
            nullable: true,
            length: 400,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "facebookid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "googleid",
            nullable: true,
            length: 400,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "googleid", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "gender", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "experiencelevel", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "experiencelevel", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "speciality", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "speciality", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "photograpyrate",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "photograpyrate", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "videograpyrate",
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "videograpyrate", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "identitycardno",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "identitycardno", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "drivinglicenseno",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "drivinglicenseno", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "licenseexpirydate",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "licenseexpirydate", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "fcmtoken",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "fcmtoken", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "latitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "longitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isonline",
            nullable: true,
            default: function () { return "false"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblagent.prototype, "isonline", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblagent.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblagent.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblagent.prototype, "updatedondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "experienceinyears", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "experienceinyears", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "birthdate",
            nullable: true,
            length: 30,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "birthdate", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "bothrate",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "bothrate", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "agentcode",
            nullable: true,
            length: 20,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "agentcode", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "instauserid",
            nullable: true,
            length: 50,
            default: function () { return "''"; },
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "instauserid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "instausername",
            nullable: true,
            length: 50,
            default: function () { return "''"; },
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "instausername", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "bankname",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "bankname", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "accountholder",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "accountholder", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "accountno",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "accountno", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "branchcode",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblagent.prototype, "branchcode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Tblagent.prototype, "totalDeviceAmount", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblrole_1.Tblrole; }, function (tblrole) { return tblrole.tblagents; }),
        (0, typeorm_1.JoinColumn)([{ name: "roleid", referencedColumnName: "id" }]),
        __metadata("design:type", Tblrole_1.Tblrole)
    ], Tblagent.prototype, "role", void 0);
    Tblagent = __decorate([
        (0, typeorm_1.Entity)("tblagent", { schema: "public" })
    ], Tblagent);
    return Tblagent;
}());
exports.Tblagent = Tblagent;
//# sourceMappingURL=Tblagent.js.map