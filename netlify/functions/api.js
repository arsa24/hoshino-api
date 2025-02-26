const express = require("express");
const serverless = require("serverless-http");
const { authenticateToken } = require("./src/skema/middleware");
const authRoutes = require("./src/skema/auth");
const { readUsers } = require("./src/skema/db");

const api = express();
api.use(express.json());

api.use("/api/skema/auth", authRoutes);
api.get("/api/skema/users", (req, res) => {
  const users = readUsers()
  res.json({ users })
});

api.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Halo ${req.user.username}, ini adalah data rahasia!` });
});

api.get("/api/hello", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports.handler = serverless(api);
