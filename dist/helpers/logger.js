'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Log = void 0;
var moment_timezone_1 = __importDefault(require('moment-timezone'));
var winston_1 = require('winston');
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, prettyPrint = winston_1.format.prettyPrint, colorize = winston_1.format.colorize;
var Log = /** @class */ (function () {
  function Log() {
  }
  Log.prototype.getLogger = function () {
    var timestampFormat = (0, moment_timezone_1.default)().format('YYYY-MM-DD HH:mm:ss');
    return (0, winston_1.createLogger)({
      format: combine(timestamp({ format: timestampFormat }), prettyPrint(), colorize()),
      level: 'debug',
      transports: [new winston_1.transports.Console()],
    });
  };
  Log.prototype.info = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var logger = this.getLogger();
    logger.info.apply(logger, args);
  };
  Log.prototype.error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var logger = this.getLogger();
    logger.error.apply(logger, args);
  };
  Log.prototype.debug = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var logger = this.getLogger();
    logger.debug.apply(logger, args);
  };
  return Log;
}());
exports.Log = Log;
//# sourceMappingURL=logger.js.map