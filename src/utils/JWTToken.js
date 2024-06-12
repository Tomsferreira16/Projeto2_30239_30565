const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const ttl = 60 * 60 * 24; // 1 day
const ttlMs = ttl * 1000;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ttl });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
  ttl,
  ttlMs,
};
