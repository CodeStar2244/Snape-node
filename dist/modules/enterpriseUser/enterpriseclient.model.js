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
exports.EnterpriseLogin = exports.EnterpriseRegister = void 0;
var class_validator_1 = require('class-validator');
var model_1 = require('../../helpers/model');
var EnterpriseRegister = /** @class */ (function (_super) {
  __extends(EnterpriseRegister, _super);
  function EnterpriseRegister(body, params) {
    var _this = _super.call(this) || this;
    _this.email = body.email;
    _this.name = body.name;
    _this.password = body.password;
    _this.registrationNumber = body.registrationNumber;
    _this.confirmPassword = body.confirmPassword;
    _this.userName = body.userName;
    return _this;
  }
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'email', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'name', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'registrationNumber', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'userName', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'password', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseRegister.prototype, 'confirmPassword', void 0);
  return EnterpriseRegister;
}(model_1.Model));
exports.EnterpriseRegister = EnterpriseRegister;
var EnterpriseLogin = /** @class */ (function (_super) {
  __extends(EnterpriseLogin, _super);
  function EnterpriseLogin(body, params) {
    var _this = _super.call(this) || this;
    _this.email = body.email;
    _this.password = body.password;
    return _this;
  }
  __decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata('design:type', String)
  ], EnterpriseLogin.prototype, 'email', void 0);
  __decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String)
  ], EnterpriseLogin.prototype, 'password', void 0);
  return EnterpriseLogin;
}(model_1.Model));
exports.EnterpriseLogin = EnterpriseLogin;
//# sourceMappingURL=enterpriseclient.model.js.map