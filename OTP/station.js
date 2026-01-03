import fs from "fs";

const key = fs.readFileSync("key");

function decrypt(cipherText) {
  const message = Buffer.alloc(cipherText.length);

  for (let i = 0; i < message.length; i++) {
    message[i] = cipherText[i] ^ key[i];
    key[i] = 0;
  }

  return message;
}

const cipher = Buffer.from(
  "65f7a93a4ff78da0bb01f50f417f53ba855616e8762de2da1e9e1b6871272b9cc2710aa20c5b",
  "hex",
);
const msg1Decrypted = decrypt(cipher);
console.log("msg1Decrypted", msg1Decrypted.toString("utf8"));
