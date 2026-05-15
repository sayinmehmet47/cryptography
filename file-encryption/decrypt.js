const fs = require("fs");
const crypto = require("crypto");

const password = process.env.FE_PASSWORD || "nonSecurePassword";

const algorithm = "aes-256-gcm";

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const PBKDF2_ITERATIONS = 1_000_000;

function decryptFile(inputPath = "./data.enc", outputPath = "./data.dec.txt") {
  const encryptedFile = fs.readFileSync(inputPath);

  const salt = encryptedFile.subarray(0, SALT_LENGTH);
  const iv = encryptedFile.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const authTag = encryptedFile.subarray(
    encryptedFile.length - AUTH_TAG_LENGTH,
  );

  const ciphertextStart = SALT_LENGTH + IV_LENGTH;
  const ciphertextEnd = encryptedFile.length - AUTH_TAG_LENGTH;
  const ciphertext = encryptedFile.subarray(ciphertextStart, ciphertextEnd);

  crypto.pbkdf2(
    password,
    salt,
    PBKDF2_ITERATIONS,
    KEY_LENGTH,
    "sha512",
    (err, key) => {
      if (err) {
        console.error("Key derivation failed.", err);
        return;
      }

      try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        decipher.setAuthTag(authTag);

        const decrypted = Buffer.concat([
          decipher.update(ciphertext),
          decipher.final(),
        ]);

        fs.writeFileSync(outputPath, decrypted);

        console.log("Decryption completed:", outputPath);
      } catch (err) {
        console.error(
          "Decryption failed. Wrong password or corrupted file.",
          err,
        );
      }
    },
  );
}

decryptFile();
