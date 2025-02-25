const fs = require("fs");

const dataPath = "./users.json";

function readUsers() {
  const data = fs.readdirSync(dataPath, "utf8");
  return data;
}

function writeUsers(user) {
  fs.writeFileSync(dataPath, JSON.stringify(user, null, 2), "utf8");
}

module.exports = { readUsers, writeUsers };
