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
exports.AgentType = void 0;
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var AgentType;
(function (AgentType) {
    AgentType["ENTERPRISE"] = "ENTERPRISE";
    AgentType["STUDIO"] = "STUDIO";
})(AgentType = exports.AgentType || (exports.AgentType = {}));
var AgentSettings = /** @class */ (function () {
    function AgentSettings() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AgentSettings.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], AgentSettings.prototype, "storage", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 0,
            nullable: true,
        }),
        __metadata("design:type", Number)
    ], AgentSettings.prototype, "assets", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "float",
            default: 3072,
        }),
        __metadata("design:type", Number)
    ], AgentSettings.prototype, "totalStorage", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Tblagent_1.Tblagent)
    ], AgentSettings.prototype, "agentId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AgentSettings.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
        __metadata("design:type", Date)
    ], AgentSettings.prototype, "updatedAt", void 0);
    AgentSettings = __decorate([
        (0, typeorm_1.Entity)("agentsettings", { schema: "public" })
    ], AgentSettings);
    return AgentSettings;
}());
exports.default = AgentSettings;
//# sourceMappingURL=agentSettings.js.map