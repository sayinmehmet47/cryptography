const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PUBLIC_KEY_PATH = path.join(__dirname, "public.pem");
const PRIVATE_KEY_PATH = path.join(__dirname, "private.pem");

// Generate keys only if they don't exist
if (!fs.existsSync(PRIVATE_KEY_PATH) || !fs.existsSync(PUBLIC_KEY_PATH)) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  fs.writeFileSync(PUBLIC_KEY_PATH, publicKey);
  fs.writeFileSync(PRIVATE_KEY_PATH, privateKey);
  console.log("Keys generated and saved\n");
}

// Load keys from files
const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, "utf-8");
const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf-8");
console.log("Keys loaded from files\n");

const dataToSign =
  "I owe $2730 to Dylan with id 2134325, payment due on July 25th.";

// 2. Sign the data with private key
const sign = crypto.createSign("SHA256");
sign.update(dataToSign);
sign.end();
const signature = sign.sign(privateKey);

console.log("Original message:", dataToSign);
console.log("Signature (base64):", signature.toString("base64"));

// 3. Verify the signature with public key
const verify = crypto.createVerify("SHA256");
verify.update(dataToSign);
verify.end();
const isValid = verify.verify(publicKey, signature);

console.log("Signature valid:", isValid);

// 4. Tamper test - change the message
const tamperedData =
  "I owe $1 to Dylan with id 2134325, payment due on July 25th.";
const verifyTampered = crypto.createVerify("SHA256");
verifyTampered.update(tamperedData);
verifyTampered.end();
const isTamperedValid = verifyTampered.verify(publicKey, signature);

console.log("Tampered signature valid:", isTamperedValid);
