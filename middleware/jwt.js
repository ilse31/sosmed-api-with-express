const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

module.exports = generateAccessToken;
