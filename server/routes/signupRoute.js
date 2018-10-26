import express from 'express';
import mongoose from 'mongoose';
import bank from '../ExternalAPI/Unionbank';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup.pug", {
    title: "Sign Up | Express Wallet",
  });
});


router.post("/add", async (req, res) => {
  const { account_name, username, email, password } = req.body;
  await bank.signup(username, password, account_name)
  req.flash('success', 'Registration Successful');
  res.redirect('http://localhost:3000/');
  return;
});

export default router;