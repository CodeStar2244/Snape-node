'use strict';
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== 'function' && b !== null)
      throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
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
exports.AssetUpdateModel = exports.AssetGetModel = exports.AssetCreateModel = exports.AssetStatus = exports.OrderValidation = exports.AssetFields = exports.AssetType = void 0;
var class_validator_1 = require('class-validator');
var model_1 = require('../../helpers/model');
var AssetType;
(function (AssetType) {
  AssetType['CELL_PHONE'] = 'CELL_PHONE';
  AssetType['CAMERA'] = 'CAMERA';
  AssetType['SCREEN'] = 'SCREEN';
  AssetType['PRINTER'] = 'PRINTER';
})(AssetType = exports.AssetType || (exports.AssetType = {}));
var AssetFields;
(function (AssetFields) {
  AssetFields['nickName'] = 'nickName';
  AssetFields['deviceID'] = 'deviceID';
  AssetFields['deviceAmount'] = 'deviceAmount';
})(AssetFields = exports.AssetFields || (exports.AssetFields = {}));
var OrderValidation;
(function (OrderValidation) {
  OrderValidation['ASC'] = 'ASC';
  OrderValidation['DESC'] = 'DESC';
})(OrderValidation = exports.OrderValidation || (exports.OrderValidation = {}));
var AssetStatus;
(function (AssetStatus) {
  AssetStatus['ACTIVE'] = 'Active';
  AssetStatus['FORSALE'] = 'For Sale';
  AssetStatus['LOST'] = 'Lost';
  AssetStatus['FORRENT'] = 'For Rent';
})(AssetStatus = exports.AssetStatus || (exports.AssetStatus = {}));
var AssetCreateModel = /** @class */ (function (_super) {
  __extends(AssetCreateModel, _super);
  function AssetCreateModel(body, params) {
    var _this = _super.call(this) || this;
    _this.type = body.type;
    _this.nickName = body.nickName;
    _this.deviceID = body.deviceID;
    _this.deviceAmount = body.deviceAmount;
    return _this;
  }
  __decorate([
    (0, class_validator_1.IsEnum)(AssetType),
    __metadata('design:type', String)
  ], AssetCreateModel.prototype, 'type', void 0);
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], AssetCreateModel.prototype, 'nickName', void 0);
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], AssetCreateModel.prototype, 'deviceID', void 0);
  __decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number)
  ], AssetCreateModel.prototype, 'deviceAmount', void 0);
  return AssetCreateModel;
}(model_1.Model));
exports.AssetCreateModel = AssetCreateModel;
var AssetGetModel = /** @class */ (function (_super) {
  __extends(AssetGetModel, _super);
  function AssetGetModel(body, params) {
    var _this = _super.call(this) || this;
    _this.status = params.status;
    _this.sort = params.sort;
    _this.order = params.order;
    return _this;
  }
  __decorate([
    (0, class_validator_1.IsEnum)(AssetStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetGetModel.prototype, 'status', void 0);
  __decorate([
    (0, class_validator_1.IsEnum)(AssetFields),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetGetModel.prototype, 'sort', void 0);
  __decorate([
    (0, class_validator_1.IsEnum)(OrderValidation),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetGetModel.prototype, 'order', void 0);
  return AssetGetModel;
}(model_1.Model));
exports.AssetGetModel = AssetGetModel;
var AssetUpdateModel = /** @class */ (function (_super) {
  __extends(AssetUpdateModel, _super);
  function AssetUpdateModel(body, params) {
    var _this = _super.call(this) || this;
    _this.type = body.type;
    _this.nickName = body.nickName;
    _this.deviceID = body.deviceID;
    _this.deviceAmount = body.deviceAmount;
    _this.status = body.status;
    return _this;
  }
  __decorate([
    (0, class_validator_1.IsEnum)(AssetType),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetUpdateModel.prototype, 'type', void 0);
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetUpdateModel.prototype, 'nickName', void 0);
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetUpdateModel.prototype, 'deviceID', void 0);
  __decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number)
  ], AssetUpdateModel.prototype, 'deviceAmount', void 0);
  __decorate([
    (0, class_validator_1.IsEnum)(AssetStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String)
  ], AssetUpdateModel.prototype, 'status', void 0);
  return AssetUpdateModel;
}(model_1.Model));
exports.AssetUpdateModel = AssetUpdateModel;
//# sourceMappingURL=enterpriseAssetRegistry.model.js.map