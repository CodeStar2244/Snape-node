'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var Tblagent_1 = require('./Tblagent');
var constants_1 = require('../config/constants');
var StudioClient = /** @class */ (function () {
  function StudioClient() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata('design:type', Number)
  ], StudioClient.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], StudioClient.prototype, 'name', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], StudioClient.prototype, 'email', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'phone',
      nullable: true,
      unique: true,
      length: 30,
    }),
    __metadata('design:type', String)
  ], StudioClient.prototype, 'phone', void 0);
  __decorate([
    (0, typeorm_1.Column)({ type: 'text', default: ''.concat(constants_1.CDN_URL, 'default/userprofile.png') }),
    __metadata('design:type', String)
  ], StudioClient.prototype, 'profileUrl', void 0);
  __decorate([
    (0, typeorm_1.ManyToOne)(function () { return Tblagent_1.Tblagent; }, function (agent) { return agent.id; }, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'agentId' }),
    __metadata('design:type', Object)
  ], StudioClient.prototype, 'createdBy', void 0);
  __decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata('design:type', Date)
  ], StudioClient.prototype, 'createdAt', void 0);
  __decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata('design:type', Date)
  ], StudioClient.prototype, 'updatedAt', void 0);
  StudioClient = __decorate([
    (0, typeorm_1.Entity)('studioclient', { schema: 'public' })
  ], StudioClient);
  return StudioClient;
}());
exports.default = StudioClient;
//# sourceMappingURL=studioClient.js.map