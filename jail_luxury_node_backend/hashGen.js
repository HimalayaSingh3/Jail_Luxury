const crypto = require("crypto");

const SESSION_SECRET = crypto.randomBytes(64).toString("hex");
const JWT_SECRET = crypto.randomBytes(64).toString("hex");

console.log("Generated SESSION_SECRET:", SESSION_SECRET);
console.log("Generated JWT_SECRET:", JWT_SECRET);