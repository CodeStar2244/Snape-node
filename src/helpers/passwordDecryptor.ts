const crypto = require('crypto');
export class PasswordDecryptor{
    private static algorithm = 'aes-256-cbc';
    public  decrypt(text) {
        let iv = Buffer.from(text.iv, 'hex');
        let envkey = Buffer.from(text.key, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv(PasswordDecryptor.algorithm, Buffer.from(envkey), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    public encrypt(text) {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(PasswordDecryptor.algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') };
    }
}