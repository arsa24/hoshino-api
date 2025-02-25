const fs = require("fs");

function readUsers(dataPath) {
  const data = fs.readdirSync(dataPath, "utf8");
  return data;
}

function writeUsers(dataPath, user) {
  fs.writeFileSync(dataPath, JSON.stringify(user, null, 2), "utf8");
}

module.exports = { readUsers, writeUsers };
