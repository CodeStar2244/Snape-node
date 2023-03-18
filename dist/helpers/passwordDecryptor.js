"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordDecryptor = void 0;
var crypto = require('crypto');
var PasswordDecryptor = /** @class */ (function () {
    function PasswordDecryptor() {
    }
    PasswordDecryptor.prototype.decrypt = function (text) {
        var iv = Buffer.from(text.iv, 'hex');
        var envkey = Buffer.from(text.key, 'hex');
        var encryptedText = Buffer.from(text.encryptedData, 'hex');
        var decipher = crypto.createDecipheriv(PasswordDecryptor.algorithm, Buffer.from(envkey), iv);
        var decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
    PasswordDecryptor.algorithm = 'aes-256-cbc';
    return PasswordDecryptor;
}());
exports.PasswordDecryptor = PasswordDecryptor;
//# sourceMappingURL=passwordDecryptor.js.map