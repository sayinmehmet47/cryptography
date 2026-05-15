const crypto = require("crypto");
const fs = require("fs");

const privateKeyPem = fs.readFileSync("./private.pm");

const privateKey = crypto.createPrivateKey({
  key: privateKeyPem,
  format: "pem",
});

const ciphertext = fs.readFileSync("../test.txt", "utf8");
const ciphertextBuffer = Buffer.from(ciphertext, "hex");

const decrypted = crypto.privateDecrypt({ key: privateKey }, ciphertextBuffer);
fs.writeFileSync("../decrypted.txt", decrypted.toString("hex"));
