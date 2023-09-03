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
exports.Tblagentmediacategoriesmapping = void 0;
var typeorm_1 = require("typeorm");
var Tblagentmediacategoriesmapping = /** @class */ (function () {
    function Tblagentmediacategoriesmapping() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Tblagentmediacategoriesmapping.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "agentid", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagentmediacategoriesmapping.prototype, "agentid", void 0);
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "mediacategoryid", nullable: true }),
        __metadata("design:type", Number)
    ], Tblagentmediacategoriesmapping.prototype, "mediacategoryid", void 0);
    Tblagentmediacategoriesmapping = __decorate([
        (0, typeorm_1.Entity)("tblagentmediacategoriesmapping", { schema: "public" })
    ], Tblagentmediacategoriesmapping);
    return Tblagentmediacategoriesmapping;
}());
exports.Tblagentmediacategoriesmapping = Tblagentmediacategoriesmapping;
//# sourceMappingURL=Tblagentmediacategoriesmapping.js.map