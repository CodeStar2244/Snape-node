"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
var l10n = __importStar(require("jm-ez-l10n"));
var constants_1 = require("../config/constants");
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder() {
    }
    ResponseBuilder.successMessage = function (msg) {
        var rb = new ResponseBuilder();
        rb.code = 200;
        rb.msg = msg;
        rb.status = constants_1.RES_STATUS.SUCCESS;
        return rb;
    };
    ResponseBuilder.errorMessage = function (msg) {
        var rb = new ResponseBuilder();
        rb.code = 500;
        rb.status = constants_1.RES_STATUS.FAIL;
        rb.error = msg != null ? msg : l10n.t("ERR_INTERNAL_SERVER");
        // rb.error = msg.message ? msg.message : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    };
    ResponseBuilder.badRequest = function (msg, code, extraPayload) {
        var rb = new ResponseBuilder();
        rb.code = code || 400;
        rb.error = __assign({ message: msg, code: code || 400, status: false }, extraPayload);
        // rb.status = RES_STATUS.FAIL;
        return rb;
    };
    ResponseBuilder.data = function (result, msg) {
        var rb = new ResponseBuilder();
        rb.code = 200;
        result.code = 200;
        result.data = msg ? __assign({ message: msg }, result.data) : __assign({}, result.data);
        rb.result = result;
        return rb;
    };
    ResponseBuilder.passArray = function (result, msg) {
        var rb = new ResponseBuilder();
        rb.code = 200;
        result.status = true;
        result.code = 200;
        rb.result = result;
        return rb;
    };
    ResponseBuilder.error = function (err, msg) {
        var rb = new ResponseBuilder();
        if (err instanceof ResponseBuilder) {
            return err;
        }
        rb.code = 500;
        rb.error = err || l10n.t("ERR_INTERNAL_SERVER");
        rb.status = constants_1.RES_STATUS.FAIL;
        rb.msg = msg || null;
        rb.description = err.description;
        rb.result = err ? l10n.t("ERR_THROW_BY_CODE") : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    };
    ResponseBuilder.fileExists = function (err, msg) {
        var rb = new ResponseBuilder();
        if (err instanceof ResponseBuilder) {
            return err;
        }
        rb.code = 409;
        rb.error = err || l10n.t("ERR_INTERNAL_SERVER");
        rb.status = constants_1.RES_STATUS.FAIL;
        rb.msg = msg || null;
        rb.description = err.description;
        rb.result = err ? l10n.t("ERR_THROW_BY_CODE") : l10n.t("ERR_INTERNAL_SERVER");
        return rb;
    };
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=responseBuilder.js.map