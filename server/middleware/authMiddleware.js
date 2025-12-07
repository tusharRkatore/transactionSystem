const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.get("/protected", (req, res) => {
  res.json("You accessed a protected route!");
});

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
