const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname + "/data/users.json");

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify([]), "utf8");
}

function readUsers() {
  const data = fs.readdirSync(dataPath, "utf8");
  return data;
}

function writeUsers(user) {
  fs.writeFileSync(dataPath, JSON.stringify(user, null, 2), "utf8");
}

module.exports = { readUsers, writeUsers };
