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
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.EnterpriseCollectionTags = void 0;
var typeorm_1 = require('typeorm');
var enterpriseCollections_1 = __importDefault(require('./enterpriseCollections'));
var EnterpriseCollectionTags = /** @class */ (function () {
  function EnterpriseCollectionTags() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata('design:type', Number)
  ], EnterpriseCollectionTags.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata('design:type', String)
  ], EnterpriseCollectionTags.prototype, 'tag', void 0);
  __decorate([
    (0, typeorm_1.ManyToMany)(function () { return enterpriseCollections_1.default; }, function (collection) { return collection.id; }),
    (0, typeorm_1.JoinTable)({ name: 'enterprisecollection_tag_join' }),
    __metadata('design:type', Array)
  ], EnterpriseCollectionTags.prototype, 'collections', void 0);
  EnterpriseCollectionTags = __decorate([
    (0, typeorm_1.Entity)()
  ], EnterpriseCollectionTags);
  return EnterpriseCollectionTags;
}());
exports.EnterpriseCollectionTags = EnterpriseCollectionTags;
//# sourceMappingURL=enterpriseCollectionTags.js.map