const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');
const CryptoJs = require('crypto-js');

console.log('asd');

const encryptData = (data, secretKey) => {
  const nonce = nacl.randomBytes(24); // Generate random nonce
  const messageUint8 = naclUtil.decodeUTF8(JSON.stringify(data));
  const encrypted = nacl.secretbox(messageUint8, nonce, secretKey);

  return {
    encryptedData: naclUtil.encodeBase64(encrypted),
    nonce: naclUtil.encodeBase64(nonce),
  };
};

const decryptData = (encryptedData, nonce, secretKey) => {
  const message = naclUtil.decodeBase64(encryptedData);
  const nonceUint8 = naclUtil.decodeBase64(nonce);
  const decrypted = nacl.secretbox.open(message, nonceUint8, secretKey);

  if (!decrypted) {
    console.error('Failed to decrypt data');
    return null;
  }

  return JSON.parse(naclUtil.encodeUTF8(decrypted));
};

const hashSecret = (secret) => {
  const hash = CryptoJs.SHA256(secret); 
  return hash.toString(CryptoJs.enc.Base64);
};

const lipsum = {lipsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae bibendum velit. Donec accumsan metus et eros tempor facilisis. Mauris volutpat, lectus in porta accumsan, dolor purus convallis nisi, in sodales quam tortor eu justo."};

const secret = 'my_secret';
const secretHash = hashSecret(secret);
const secretKey = naclUtil.decodeBase64(secretHash);

console.log({secret, secretHash, secretKey});


const encrypted = encryptData(lipsum, secretKey);

console.log('Encrypted Data:', encrypted.encryptedData);
console.log('Nonce:', encrypted.nonce);

const decrypted = decryptData(encrypted.encryptedData, encrypted.nonce, secretKey);

console.log('Decrypted Data:', decrypted);

const encryptedLipsum = "rgO0Uy3evSU5wD0CibrjZHA2eqDf7s3B5SNt9BFzCf8P8OCnA4/Bf+tmd8Ir6zToIMTuOoSsj4LQ7V8A7IfDPw==";
const encryptedNonce = "EQi9wtKp6AYrdVFw8ECn1RrN17/Aej5m";
const encryptedSecret = 'asdf';
const encryptedSecretHash = hashSecret(encryptedSecret);
const encryptedSecretKey = naclUtil.decodeBase64(encryptedSecretHash);


const decryptedLipsum = decryptData(encryptedLipsum, encryptedNonce, encryptedSecretKey);

console.log('Decrypted Lipsum:', decryptedLipsum);

