"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
var dotenv = __importStar(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { ResponseBuilder } from "./responseBuilder";
// import * as Constant from "../shared/constants/app.const"
dotenv.config();
var Jwt = /** @class */ (function () {
    function Jwt() {
    }
    /*
    * getAuthToken
    */
    Jwt.getAuthToken = function (payload) {
        return jsonwebtoken_1.default.sign({ payload: payload }, process.env.JWT_SECRET, { expiresIn: process.env.JwtExpireTime });
    };
    /*
    * decodeAuthToken
    */
    Jwt.decodeAuthToken = function (token) {
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decodedToken) {
            return decodedToken;
        }
        else {
            // throw ResponseBuilder.badRequest(l10n.t("NOT_VERIFIED_TOKEN"));
        }
    };
    Jwt.encodeString = function (text, secret) {
        return jsonwebtoken_1.default.sign({ text: text }, secret ? secret : process.env.JWT_SECRET);
    };
    Jwt.decodeString = function (text) {
        return jsonwebtoken_1.default.decode(text);
    };
    return Jwt;
}());
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map