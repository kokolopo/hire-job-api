const crypto = require("crypto");

const generateRandomString = (length) => {
  // Generate random bytes
  const buffer = crypto.randomBytes(length);

  // Convert bytes to string using base64 encoding
  const password = buffer.toString("base64");

  // Return password with specified length
  return password.substring(0, length);
};
module.exports = generateRandomString;
