const crypto = require('crypto');
require('dotenv').config()

//#region 1. 단방향 암호화
const secret = 'abcdefg';

encrypted_value = crypto.createHash('sha512').update(secret).digest('base64')

console.log(encrypted_value)
//#endregion

//#region 2. 대칭키 암호화/복호화
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

// 암호화 함수
function encrypt(text) {
 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// 복호화 함수
function decrypt(text) {
 let textParts = text.split(':');
 let iv = Buffer.from(textParts.shift(), 'hex');
 let encryptedText = Buffer.from(textParts.join(':'), 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

// 암호화 테스트
let enc = encrypt('hello world')
console.log(enc)

let dec = decrypt(enc);
console.log(dec)
//#endregion