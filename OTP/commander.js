import fs from "fs";

const key = fs.readFileSync("key");

function encrypt(message) {
  const cipherText = Buffer.alloc(message.length);

  for (let i = 0; i < message.length; i++) {
    cipherText[i] = message[i] ^ key[i];
    key[i] = 0;
  }

  return cipherText;
}

const msg1 = Buffer.from("Commander Henrique: Standby to launch.");
const msg1Encrypted = encrypt(msg1);
console.log("msg1Encrypted", msg1Encrypted);
