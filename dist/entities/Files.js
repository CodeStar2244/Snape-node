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
exports.FileType = void 0;
var typeorm_1 = require('typeorm');
var Collection_1 = __importDefault(require('./Collection'));
var FileType;
(function (FileType) {
  FileType['PHOTO'] = 'PHOTO';
  FileType['VIDEO'] = 'VIDEO';
})(FileType = exports.FileType || (exports.FileType = {}));
var FilesEntity = /** @class */ (function () {
  function FilesEntity() {
  }
  __decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata('design:type', Number)
  ], FilesEntity.prototype, 'id', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'name', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'url', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'cdnUrl', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'compressedKey', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'compressedCdnUrl', void 0);
  __decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'float', default: 0 }),
    __metadata('design:type', Number)
  ], FilesEntity.prototype, 'compressedImageSize', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'key', void 0);
  __decorate([
    (0, typeorm_1.Column)({
      type: 'float',
      default: 0,
    }),
    __metadata('design:type', Number)
  ], FilesEntity.prototype, 'size', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', Number)
  ], FilesEntity.prototype, 'height', void 0);
  __decorate([
    (0, typeorm_1.Column)(),
    __metadata('design:type', Number)
  ], FilesEntity.prototype, 'width', void 0);
  __decorate([
    (0, typeorm_1.Column)({
      type: 'enum',
      enum: FileType,
      default: FileType.PHOTO,
    }),
    __metadata('design:type', String)
  ], FilesEntity.prototype, 'type', void 0);
  __decorate([
    (0, typeorm_1.ManyToOne)(function () { return Collection_1.default; }, function (collection) { return collection.id; }, {
      onDelete: 'CASCADE',
    }),
    __metadata('design:type', Collection_1.default)
  ], FilesEntity.prototype, 'collection', void 0);
  __decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata('design:type', Date)
  ], FilesEntity.prototype, 'createdAt', void 0);
  __decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata('design:type', Date)
  ], FilesEntity.prototype, 'updatedAt', void 0);
  FilesEntity = __decorate([
    (0, typeorm_1.Entity)('files', { schema: 'public' })
  ], FilesEntity);
  return FilesEntity;
}());
exports.default = FilesEntity;
//# sourceMappingURL=Files.js.map