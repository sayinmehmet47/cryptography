const fs = require("fs");
const crypto = require("crypto");
const { pipeline } = require("stream");

/**
 * First 16 bytes: Salt
 * Second 16 bytes: IV
 * Everyhing here: output
 * Last 16 bytes: Message Authentication Code
 */

// our master password
const password = process.env.FE_PASSWORD || "nonSecurePassword";

const algorithm = "aes-256-gcm";

// salt
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

console.log("Salt:", salt.toString("hex"));
console.log("IV:", iv.toString("hex"));

crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, key) => {
  if (err) return console.error(err);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const plainText = fs.createReadStream("./data.txt");
  const output = fs.createWriteStream("./data.enc"); // salt + iv + ciphertext + mac

  output.write(salt);
  output.write(iv);
  console.log("process.env", process.env.FE_PASSWORD);
  pipeline(plainText, cipher, output, (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    }

    const authCode = cipher.getAuthTag(); // get the Message Authentication Code
    console.log("MAC:", authCode);
    fs.appendFileSync("./data.enc", authCode);
    console.log("Encryption completed and authentication code written");
  });
});
