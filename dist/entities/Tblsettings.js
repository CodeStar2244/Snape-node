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
exports.Tblsettings = void 0;
var typeorm_1 = require('typeorm');
var Tblsettings = /** @class */ (function () {
  function Tblsettings() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata('design:type', Number)
  ], Tblsettings.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'privacypolicy',
      nullable: true,
      length: 8000,
    }),
    __metadata('design:type', String)
  ], Tblsettings.prototype, 'privacypolicy', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'aboutus',
      nullable: true,
      length: 8000,
    }),
    __metadata('design:type', String)
  ], Tblsettings.prototype, 'aboutus', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'contactus',
      nullable: true,
      length: 8000,
    }),
    __metadata('design:type', String)
  ], Tblsettings.prototype, 'contactus', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', {
      name: 'termsconditions',
      nullable: true,
      length: 8000,
    }),
    __metadata('design:type', String)
  ], Tblsettings.prototype, 'termsconditions', void 0);
  __decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'createdondate' }),
    __metadata('design:type', Date)
  ], Tblsettings.prototype, 'createdondate', void 0);
  __decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
      name: 'updatedondate',
      nullable: true,
    }),
    __metadata('design:type', Date)
  ], Tblsettings.prototype, 'updatedondate', void 0);
  Tblsettings = __decorate([
    (0, typeorm_1.Entity)('tblsettings', { schema: 'public' })
  ], Tblsettings);
  return Tblsettings;
}());
exports.Tblsettings = Tblsettings;
//# sourceMappingURL=Tblsettings.js.map