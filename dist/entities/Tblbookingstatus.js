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
exports.Tblbookingstatus = void 0;
var typeorm_1 = require("typeorm");
var Tblbookingstatus = /** @class */ (function () {
    function Tblbookingstatus() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblbookingstatus.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "title", length: 255 }),
        __metadata("design:type", String)
    ], Tblbookingstatus.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "description",
            nullable: true,
            length: 200,
        }),
        __metadata("design:type", String)
    ], Tblbookingstatus.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "isactive",
            nullable: true,
            default: function () { return "true"; },
        }),
        __metadata("design:type", Boolean)
    ], Tblbookingstatus.prototype, "isactive", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "createdondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbookingstatus.prototype, "createdondate", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp without time zone", {
            name: "updatedondate",
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Tblbookingstatus.prototype, "updatedondate", void 0);
    Tblbookingstatus = __decorate([
        (0, typeorm_1.Entity)("tblbookingstatus", { schema: "public" })
    ], Tblbookingstatus);
    return Tblbookingstatus;
}());
exports.Tblbookingstatus = Tblbookingstatus;
//# sourceMappingURL=Tblbookingstatus.js.map