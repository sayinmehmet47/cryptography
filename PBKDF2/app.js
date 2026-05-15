const crypto = require("crypto");

const password = "my_password";

const salt = crypto.randomBytes(32);
const iterations = 1000000;
const keyLength = 129;
const digest = "sha512";

console.time("PBKDF2");

crypto.pbkdf2(
  password,
  salt,
  iterations,
  keyLength,
  digest,
  (err, derivedKey) => {
    if (err) console.log(err);

    console.log("Derived Key:", derivedKey.toString("hex"));
    console.timeEnd("PBKDF");
  },
);
