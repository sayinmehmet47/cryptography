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
const cipher2 = Buffer.from(
  "436f6d6d616e6465722048656e72697175653a204c61756e6368696e6720696e20313020736574d4ea8d1b81",
  "hex",
);
const msg1Decrypted = decrypt(cipher);
const msg2Decrypted = decrypt(cipher2);
console.log("msg1Decrypted", msg1Decrypted.toString("utf8"));
console.log("msg2Decrypted", msg2Decrypted.toString("utf8"));
