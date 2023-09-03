"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordDecryptor = void 0;
var crypto = require("crypto");
var PasswordDecryptor = /** @class */ (function () {
    function PasswordDecryptor() {
    }
    PasswordDecryptor.prototype.decrypt = function (text) {
        var iv = Buffer.from(text.iv, "hex");
        var envkey = Buffer.from(text.key, "hex");
        var encryptedText = Buffer.from(text.encryptedData, "hex");
        var decipher = crypto.createDecipheriv(PasswordDecryptor.algorithm, Buffer.from(envkey), iv);
        var decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
    PasswordDecryptor.prototype.encrypt = function (text) {
        var key = crypto.randomBytes(32);
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv(PasswordDecryptor.algorithm, Buffer.from(key), iv);
        var encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString("hex"),
            encryptedData: encrypted.toString("hex"),
            key: key.toString("hex"),
        };
    };
    PasswordDecryptor.algorithm = "aes-256-cbc";
    return PasswordDecryptor;
}());
exports.PasswordDecryptor = PasswordDecryptor;
//# sourceMappingURL=passwordDecryptor.js.map