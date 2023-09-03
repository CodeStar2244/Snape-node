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
exports.Tblmediaqualification = void 0;
var typeorm_1 = require("typeorm");
var Tblmediaqualification = /** @class */ (function () {
    function Tblmediaqualification() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblmediaqualification.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "agentid", nullable: true }),
        __metadata("design:type", Number)
    ], Tblmediaqualification.prototype, "agentid", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "qualificationtype",
            nullable: true,
            length: 100,
        }),
        __metadata("design:type", String)
    ], Tblmediaqualification.prototype, "qualificationtype", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "field", nullable: true, length: 100 }),
        __metadata("design:type", String)
    ], Tblmediaqualification.prototype, "field", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "school", nullable: true, length: 255 }),
        __metadata("design:type", String)
    ], Tblmediaqualification.prototype, "school", void 0);
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "yearofcompletion",
            nullable: true,
            length: 50,
        }),
        __metadata("design:type", String)
    ], Tblmediaqualification.prototype, "yearofcompletion", void 0);
    Tblmediaqualification = __decorate([
        (0, typeorm_1.Entity)("tblmediaqualification", { schema: "public" })
    ], Tblmediaqualification);
    return Tblmediaqualification;
}());
exports.Tblmediaqualification = Tblmediaqualification;
//# sourceMappingURL=Tblmediaqualification.js.map