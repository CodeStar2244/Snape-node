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
exports.EnterpriseCollectionDesign = exports.GridSpacingEnum = exports.GridStyleEnum = void 0;
var typeorm_1 = require('typeorm');
var collectionThemes_1 = require('./collectionThemes');
var enterpriseCollections_1 = __importDefault(require('./enterpriseCollections'));
var GridStyleEnum;
(function (GridStyleEnum) {
  GridStyleEnum['VERTICAL'] = 'column';
  GridStyleEnum['HORIZONAL'] = 'row';
})(GridStyleEnum = exports.GridStyleEnum || (exports.GridStyleEnum = {}));
var GridSpacingEnum;
(function (GridSpacingEnum) {
  GridSpacingEnum['REGULAR'] = 'regular';
  GridSpacingEnum['LARGE'] = 'large';
})(GridSpacingEnum = exports.GridSpacingEnum || (exports.GridSpacingEnum = {}));
var EnterpriseCollectionDesign = /** @class */ (function () {
  function EnterpriseCollectionDesign() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata('design:type', Number)
  ], EnterpriseCollectionDesign.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata('design:type', String)
  ], EnterpriseCollectionDesign.prototype, 'typography', void 0);
  __decorate([
    (0, typeorm_1.ManyToOne)(function () { return collectionThemes_1.CollectionThemes; }, function (theme) { return theme.id; }, { nullable: true }),
    __metadata('design:type', collectionThemes_1.CollectionThemes)
  ], EnterpriseCollectionDesign.prototype, 'theme', void 0);
  __decorate([
    (0, typeorm_1.Column)({
      type: 'enum',
      enum: GridStyleEnum,
      default: GridStyleEnum.VERTICAL,
    }),
    __metadata('design:type', String)
  ], EnterpriseCollectionDesign.prototype, 'gridStyle', void 0);
  __decorate([
    (0, typeorm_1.Column)({
      type: 'enum',
      enum: GridSpacingEnum,
      default: GridSpacingEnum.REGULAR,
    }),
    __metadata('design:type', String)
  ], EnterpriseCollectionDesign.prototype, 'gridSpacing', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata('design:type', Number)
  ], EnterpriseCollectionDesign.prototype, 'focusX', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata('design:type', Number)
  ], EnterpriseCollectionDesign.prototype, 'focusY', void 0);
  __decorate([
    (0, typeorm_1.OneToOne)(function () { return enterpriseCollections_1.default; }, function (collection) { return collection.id; }, {
      onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'collectionId' }),
    __metadata('design:type', enterpriseCollections_1.default)
  ], EnterpriseCollectionDesign.prototype, 'collections', void 0);
  EnterpriseCollectionDesign = __decorate([
    (0, typeorm_1.Entity)()
  ], EnterpriseCollectionDesign);
  return EnterpriseCollectionDesign;
}());
exports.EnterpriseCollectionDesign = EnterpriseCollectionDesign;
//# sourceMappingURL=enterprisecollectionDesign.js.map