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
exports.StudioQuestionnaries = void 0;
var typeorm_1 = require("typeorm");
var Tblagent_1 = require("./Tblagent");
var studioClient_1 = __importDefault(require("./studioClient"));
var StudioQuestionnaries = /** @class */ (function () {
    function StudioQuestionnaries() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StudioQuestionnaries.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "AWAITING RESPONSE" }),
        __metadata("design:type", String)
    ], StudioQuestionnaries.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)('jsonb', { default: {} }),
        __metadata("design:type", Object)
    ], StudioQuestionnaries.prototype, "template", void 0);
    __decorate([
        (0, typeorm_1.Column)('jsonb', { default: {} }),
        __metadata("design:type", Object)
    ], StudioQuestionnaries.prototype, "response", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return studioClient_1.default; }, function (client) { return client.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "clientId" }),
        __metadata("design:type", studioClient_1.default)
    ], StudioQuestionnaries.prototype, "clientId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "agentId" }),
        __metadata("design:type", Object)
    ], StudioQuestionnaries.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], StudioQuestionnaries.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], StudioQuestionnaries.prototype, "updatedAt", void 0);
    StudioQuestionnaries = __decorate([
        (0, typeorm_1.Entity)({ name: "studioquestionnaries" })
    ], StudioQuestionnaries);
    return StudioQuestionnaries;
}());
exports.StudioQuestionnaries = StudioQuestionnaries;
//# sourceMappingURL=studioQuestionnaries.js.map