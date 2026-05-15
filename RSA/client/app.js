const crypto = require("crypto");
const fs = require("fs");

const sharedSecret = crypto.randomBytes(48);
console.log("sharedSecret", sharedSecret.toString("hex"));

const publicKeyPem = fs.readFileSync(
  "/Users/mehmetsayin/projects/cryptography/RSA/public.pm",
);

const publicKey = crypto.createPublicKey({
  key: publicKeyPem,
  format: "pem",
});

const ciphertext = crypto.publicEncrypt({ key: publicKey }, sharedSecret);

fs.writeFileSync("../test.txt", ciphertext.toString("hex"));
