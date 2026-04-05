const crypto = require("node:crypto");

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function sign(data, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * @param {Object} payload
 * @param {string} secret
 * @param {number} expiresIn (segundos)
 * @returns {string}
 */
function generateJWT(payload, secret, expiresIn = 3600) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));

  const signature = sign(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * @param {string} token
 * @param {string} secret
 * @returns {Object} payload
 */
function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("invalid token format");

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = sign(`${encodedHeader}.${encodedPayload}`, secret);
  if (signature !== expectedSignature) throw new Error("invalid signature");

  const payload = JSON.parse(
    Buffer.from(encodedPayload, "base64url").toString(),
  );

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error("token expired");

  return payload;
}

module.exports = { generateJWT, verifyJWT };
