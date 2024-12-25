const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists");
    const user = new User({ username, password });
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
});

router.get("/login", (req, res) => res.render("login"));

router.post("/login", passport.authenticate("local", {
  successRedirect: "/budget/dashboard",
  failureRedirect: "/auth/login",
}));

module.exports = router;
