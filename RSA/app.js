const crypto = require("crypto");
const fs = require("fs");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2054,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8", // other option pkcs1
    format: "pem",
  },
});

console.log(publicKey);
console.log(privateKey);

fs.writeFileSync("private.pm", privateKey);
fs.writeFileSync("public.pm", publicKey);

// const privateKeyPem = fs.readFileSync("private.pm");
// const publicKeyPem = fs.readFileSync("public.pm");

// console.log("Bufferfrompublic", Buffer.from(publicKeyPem));

// const privateKey = crypto.createPrivateKey({
//   key: privateKeyPem,
//   format: "pem",
// });

// const publicKey = crypto.createPublicKey({
//   key: publicKeyPem,
//   format: "pem",
// });

// const plainText = Buffer.from("This is my password 34343d", "utf8");

// const ciphertext = crypto.publicEncrypt({ key: publicKey }, plainText);

// console.log("ciphertext", ciphertext);

// const decrypted = crypto.privateDecrypt({ key: privateKey }, ciphertext);

// console.log("decrypted", decrypted);

// crypto.privateEncrypt(privateKey, plainText);
