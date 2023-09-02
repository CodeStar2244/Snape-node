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
exports.Tblimages = void 0;
var typeorm_1 = require('typeorm');
var Tblimages = /** @class */ (function () {
  function Tblimages() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata('design:type', Number)
  ], Tblimages.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', { name: 'entitytype', length: 255 }),
    __metadata('design:type', String)
  ], Tblimages.prototype, 'entitytype', void 0);
  __decorate([
    (0, typeorm_1.Column)('integer', { name: 'entityid' }),
    __metadata('design:type', Number)
  ], Tblimages.prototype, 'entityid', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'imagename',
      nullable: true,
      length: 255,
    }),
    __metadata('design:type', String)
  ], Tblimages.prototype, 'imagename', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'imagepath',
      nullable: true,
      length: 255,
    }),
    __metadata('design:type', String)
  ], Tblimages.prototype, 'imagepath', void 0);
  __decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
      name: 'createdondate',
      nullable: true,
    }),
    __metadata('design:type', Date)
  ], Tblimages.prototype, 'createdondate', void 0);
  __decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
      name: 'updatedondate',
      nullable: true,
    }),
    __metadata('design:type', Date)
  ], Tblimages.prototype, 'updatedondate', void 0);
  Tblimages = __decorate([
    (0, typeorm_1.Entity)('tblimages', { schema: 'public' })
  ], Tblimages);
  return Tblimages;
}());
exports.Tblimages = Tblimages;
//# sourceMappingURL=Tblimages.js.map