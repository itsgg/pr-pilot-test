// User management with security issues
const crypto = require("crypto");
const fs = require("fs");

// SECURITY ISSUE: Hardcoded API key
const API_KEY = "sk-1234567890abcdef1234567890abcdef";

// SECURITY ISSUE: Using MD5 for password hashing
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

// SECURITY ISSUE: SQL injection vulnerability
function getUserById(userId) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  // This is vulnerable to SQL injection
  return database.query(query);
}

// SECURITY ISSUE: No input validation
function updateUserProfile(userData) {
  // No validation - accepts any input
  const query = `UPDATE users SET name='${userData.name}', email='${userData.email}' WHERE id=${userData.id}`;
  return database.query(query);
}

// SECURITY ISSUE: Logging sensitive data
function loginUser(username, password) {
  console.log(`Login attempt: username=${username}, password=${password}`);

  const hashedPassword = hashPassword(password);
  const user = database.findUser(username, hashedPassword);

  if (user) {
    console.log(`Successful login for user: ${JSON.stringify(user)}`);
    return user;
  }
  return null;
}

// SECURITY ISSUE: Unsafe file operations
function saveUserAvatar(userId, avatarData) {
  const filename = `avatars/${userId}.jpg`;
  fs.writeFileSync(filename, avatarData); // No path validation
}

module.exports = {
  hashPassword,
  getUserById,
  updateUserProfile,
  loginUser,
  saveUserAvatar,
};
