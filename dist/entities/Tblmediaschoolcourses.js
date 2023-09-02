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
exports.Tblmediaschoolcourses = void 0;
var typeorm_1 = require('typeorm');
var Tblmediaschoolcourses = /** @class */ (function () {
  function Tblmediaschoolcourses() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata('design:type', Number)
  ], Tblmediaschoolcourses.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)('integer', { name: 'mediaschoolid', nullable: true }),
    __metadata('design:type', Number)
  ], Tblmediaschoolcourses.prototype, 'mediaschoolid', void 0);
  __decorate([
    (0, typeorm_1.Column)('character varying', { name: 'title', nullable: true, length: 100 }),
    __metadata('design:type', String)
  ], Tblmediaschoolcourses.prototype, 'title', void 0);
  Tblmediaschoolcourses = __decorate([
    (0, typeorm_1.Entity)('tblmediaschoolcourses', { schema: 'public' })
  ], Tblmediaschoolcourses);
  return Tblmediaschoolcourses;
}());
exports.Tblmediaschoolcourses = Tblmediaschoolcourses;
//# sourceMappingURL=Tblmediaschoolcourses.js.map