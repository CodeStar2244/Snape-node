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
exports.Tblrole = void 0;
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var Tblclient_1 = require("./Tblclient");
var Tbluser_1 = require("./Tbluser");
var Tblrole = /** @class */ (function () {
    function Tblrole() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblrole.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "rolename", unique: true, length: 50 }),
        __metadata("design:type", String)
    ], Tblrole.prototype, "rolename", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblrole.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblrole.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblrole.prototype, "updatedondate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Tblagent_1.Tblagent; }, function (tblagent) { return tblagent.role; }),
        __metadata("design:type", Array)
    ], Tblrole.prototype, "tblagents", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Tblclient_1.Tblclient; }, function (tblclient) { return tblclient.role; }),
        __metadata("design:type", Array)
    ], Tblrole.prototype, "tblclients", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Tbluser_1.Tbluser; }, function (tbluser) { return tbluser.role; }),
        __metadata("design:type", Array)
    ], Tblrole.prototype, "tblusers", void 0);
    Tblrole = __decorate([
        (0, typeorm_1.Entity)("tblrole", { schema: "public" })
    ], Tblrole);
    return Tblrole;
}());
exports.Tblrole = Tblrole;
//# sourceMappingURL=Tblrole.js.map