import crypto from "crypto";
import fs from "fs";

const key = crypto.randomBytes(100); // 100 bytes truly random data
fs.writeFileSync("key", key);
