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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function(o, v) {
  o['default'] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Failure = void 0;
var l10n = __importStar(require('jm-ez-l10n'));
var constant = __importStar(require('../config/constants'));
var Failure = /** @class */ (function (_super) {
  __extends(Failure, _super);
  // Better approach need to be found for type
  function Failure(title, description, errStack, isError, data) {
    var _this = _super.call(this, title) || this;
    _this.title = title;
    _this.type = isError ? constant.CODE : constant.BAD_DATA;
    _this.description = description;
    if (errStack) {
      _this.errorStack = errStack;
    }
    if (data) {
      _this.data = data;
    }
    return _this;
  }
  Failure.error = function (err, data) {
    if (err instanceof Failure) {
      err.type = err.type ? err.type : constant.BAD_DATA;
      err.data = err.data === undefined ? data : err.data;
      return err;
    }
    var error = new Failure(l10n.t('ERR_INTERNAL_SERVER'), 'Error is thrown by code', err, false, data);
    error.type = constant.CODE;
    error.errorStack = err;
    error.data = data;
    return error;
  };
  Failure.spError = function (err, isSpError) {
    if (err instanceof Failure) {
      err.type = isSpError ? constant.CODE : constant.BAD_DATA;
      return err;
    }
    var error = new Failure(l10n.t('ERR_INTERNAL_SERVER'), 'Error is thrown by code');
    error.type = constant.CODE;
    error.errorStack = err;
    return error;
  };
  Failure.throwApiError = function (response) {
    if (response && response.responseCode === '01') {
      return new Failure(response.responseDescription || l10n.t('ERR_THIRD_PARTY'), response.responseDescription || l10n.t('ERR_THIRD_PARTY'), response, false);
    }
    return new Failure(l10n.t('ERR_THIRD_PARTY'), response.responseDescription || l10n.t('ERR_THIRD_PARTY'), response, false);
  };
  return Failure;
}(Error));
exports.Failure = Failure;
// export class SpFailure extends Failure {
//   constructor(title, description: string, isSpError: boolean, data?: Json) {
//     super(title, description);
//     super.type = isSpError ? constant.CODE : constant.BAD_DATA;
//     super.data = data;
//   }
// }
//# sourceMappingURL=error.js.map