import cryptoSha256 from 'crypto-js/sha256';
import cryptoBase64 from 'crypto-js/enc-base64';
import cryptoAES from 'crypto-js/aes';

export function GeneratePassPhrase() {
   // Dev only, implement a more truly random password generator
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*-+",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
  
    return retVal
  }

  export function CreateHash(passphrase) {
    // Accepts passphrase as string and returns hash as string
    const hash = cryptoSha256(passphrase);
    const hashString = hash.toString(cryptoBase64)
    console.log(`debug: passphrase : ${passphrase}`);
    console.log(`debug: hashString : ${hashString}`);
    return hashString
   }

   export function EncryptString(plaintext, passphrase) {
    // Accepts plaintext and passphrase as strings and returns cipher as string
    const cipher = cryptoAES.encrypt(plaintext, passphrase);
    const cipherString = cipher.toString();
    console.log(`debug: plaintext : ${plaintext}`);
    console.log(`debug: passphrase : ${passphrase}`);
    console.log(`debug: cipher : ${cipherString}`);
    return cipherString
   }

   export function decryptString(cipher, passphrase) {
    // Accepts cipher and passphrase as strings and returns unencrypted plaintext as string
    const decrypted = cryptoAES.decrypt(cipher, passphrase);
    const decryptedString = decrypted.toString(cryptoBase64.Utf8);
    console.log(`debug: cipher : ${cipher}`);
    console.log(`debug: passphrase : ${passphrase}`);
    console.log(`debug: plaintext : ${decryptedString}`);
    return decryptedString
   }