const fs = require("fs");
const path = require("path");


const dataPath = path.join(__dirname + "/users.json");

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]), "utf8")
}

function readUsers() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function writeUsers(user) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(user, null, 2), "utf8");
  } catch (e) { console.error(e) }
}

module.exports = { readUsers, writeUsers };
