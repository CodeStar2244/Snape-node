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
var typeorm_1 = require("typeorm");
var enterPriseClient_1 = require("./enterPriseClient");
var Tblagent_1 = require("./Tblagent");
var EnterpriseAgentFavourite = /** @class */ (function () {
    function EnterpriseAgentFavourite() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EnterpriseAgentFavourite.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return enterPriseClient_1.EnterPriseClient; }, function (client) { return client.id; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", enterPriseClient_1.EnterPriseClient)
    ], EnterpriseAgentFavourite.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Tblagent_1.Tblagent)
    ], EnterpriseAgentFavourite.prototype, "agentId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseAgentFavourite.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], EnterpriseAgentFavourite.prototype, "updatedAt", void 0);
    EnterpriseAgentFavourite = __decorate([
        (0, typeorm_1.Entity)("enterpriseAgentFavourite", { schema: "public" })
    ], EnterpriseAgentFavourite);
    return EnterpriseAgentFavourite;
}());
exports.default = EnterpriseAgentFavourite;
//# sourceMappingURL=enterpriseAgentFavourite.js.map