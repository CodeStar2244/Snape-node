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
exports.Tblmediaschool = void 0;
var typeorm_1 = require("typeorm");
var Tblmediaschool = /** @class */ (function () {
    function Tblmediaschool() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblmediaschool.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "name", nullable: true, length: 100 }),
        __metadata("design:type", String)
    ], Tblmediaschool.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "latitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblmediaschool.prototype, "latitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", {
            name: "longitude",
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Tblmediaschool.prototype, "longitude", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address1",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblmediaschool.prototype, "address1", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "address2",
            nullable: true,
            length: 500,
        }),
        __metadata("design:type", String)
    ], Tblmediaschool.prototype, "address2", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "category", nullable: true }),
        __metadata("design:type", Number)
    ], Tblmediaschool.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "rating", nullable: true }),
        __metadata("design:type", Number)
    ], Tblmediaschool.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "aboutus", nullable: true, length: 500 }),
        __metadata("design:type", String)
    ], Tblmediaschool.prototype, "aboutus", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "website", nullable: true, length: 100 }),
        __metadata("design:type", String)
    ], Tblmediaschool.prototype, "website", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblmediaschool.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Object)
    ], Tblmediaschool.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Object)
    ], Tblmediaschool.prototype, "updatedondate", void 0);
    Tblmediaschool = __decorate([
        (0, typeorm_1.Entity)("tblmediaschool", { schema: "public" })
    ], Tblmediaschool);
    return Tblmediaschool;
}());
exports.Tblmediaschool = Tblmediaschool;
//# sourceMappingURL=Tblmediaschool.js.map