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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var plans_1 = __importDefault(require("./plans"));
var AgentPlans = /** @class */ (function () {
    function AgentPlans() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AgentPlans.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return plans_1.default; }, function (plan) { return plan.id; }),
        (0, typeorm_1.JoinColumn)({ name: "planId" }),
        __metadata("design:type", plans_1.default)
    ], AgentPlans.prototype, "planId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AgentPlans.prototype, "validTill", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Tblagent_1.Tblagent)
    ], AgentPlans.prototype, "agentId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AgentPlans.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AgentPlans.prototype, "updatedAt", void 0);
    AgentPlans = __decorate([
        (0, typeorm_1.Entity)("agentPlans", { schema: "public" })
    ], AgentPlans);
    return AgentPlans;
}());
exports.default = AgentPlans;
//# sourceMappingURL=agentPlans.js.map