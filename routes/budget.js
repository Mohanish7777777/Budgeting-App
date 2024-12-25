const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/auth/login");
  const user = await User.findById(req.user.id);
  res.render("dashboard", { user });
});

router.post("/set-budget", async (req, res) => {
  const { budget } = req.body;
  await User.findByIdAndUpdate(req.user.id, { budget });
  res.redirect("/budget/dashboard");
});

router.post("/add-expense", async (req, res) => {
  const { title, amount } = req.body;
  const user = await User.findById(req.user.id);
  user.expenses.push({ title, amount });
  await user.save();
  res.redirect("/budget/dashboard");
});

router.post("/delete-expense/:id", async (req, res) => {
  const user = await User.findById(req.user.id);
  user.expenses = user.expenses.filter((_, index) => index != req.params.id);
  await user.save();
  res.redirect("/budget/dashboard");
});

module.exports = router;
