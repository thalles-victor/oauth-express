const crypto = require("node:crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const inputHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return inputHash === hash;
}

module.exports = { hashPassword, verifyPassword };
