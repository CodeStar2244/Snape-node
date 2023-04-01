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
exports.Tbluser = void 0;
var typeorm_1 = require("typeorm");
var Tblrole_1 = require("./Tblrole");
var Tbluser = /** @class */ (function () {
    function Tbluser() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tbluser.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "firstname",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "firstname", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "lastname",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "lastname", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "countrycode",
            nullable: true,
            length: 10,
        }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "countrycode", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "phone", unique: true, length: 30 }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "email", nullable: true, length: 150 }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "password", length: 100 }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "iv", nullable: true, length: 400 }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "iv", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "envkey", nullable: true, length: 400 }),
        __metadata("design:type", String)
    ], Tbluser.prototype, "envkey", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "issuperadmin",
            nullable: true,
            default: function () { return "false"; },
        }),
        __metadata("design:type", Boolean)
    ], Tbluser.prototype, "issuperadmin", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tbluser.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Object)
    ], Tbluser.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Object)
    ], Tbluser.prototype, "updatedondate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblrole_1.Tblrole; }, function (tblrole) { return tblrole.tblusers; }),
        (0, typeorm_1.JoinColumn)([{ name: "roleid", referencedColumnName: "id" }]),
        __metadata("design:type", Tblrole_1.Tblrole)
    ], Tbluser.prototype, "role", void 0);
    Tbluser = __decorate([
        (0, typeorm_1.Entity)("tbluser", { schema: "public" })
    ], Tbluser);
    return Tbluser;
}());
exports.Tbluser = Tbluser;
//# sourceMappingURL=Tbluser.js.map