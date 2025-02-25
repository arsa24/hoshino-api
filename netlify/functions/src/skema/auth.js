const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { readUsers, writeUsers } = require("./db");
require("dotenv").config();

const KEY = process.env.KEY || "admin#1234";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const users = readUsers();

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Username sudah terdaftar" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  res.json({ message: "User berhasil didaftarkan" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "User tidak ditemukan" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Password salah" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login berhasil", token });
});

module.exports = router;
