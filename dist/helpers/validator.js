'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Validator = void 0;
var model_1 = require('./model');
var Validator = /** @class */ (function () {
  function Validator() {
  }
  Validator.prototype.validate = function (arg) {
    var classThis = this;
    return function (req, res, next) {
      model_1.Model.getModel(arg, req.body, req.query)
        .then(function (m2) {
          req.model = m2;
          next();
        })
        .catch(function (err) {
          var error = err.length > 0 ? classThis.getError(err) : err;
          return res.status(400).json({ error: error, code: 400 });
        });
    };
  };
  Validator.prototype.getError = function (err) {
    if (err[0].constraints) {
      return err[0].constraints[Object.keys(err[0].constraints)[0]];
    }
    else {
      return this.getError(err[0].children);
    }
  };
  return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map