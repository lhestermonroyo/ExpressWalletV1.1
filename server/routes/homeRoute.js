const express = require('express');
const bank = require('../ExternalAPI/Unionbank');
const router = express.Router();

router.get("/", (req, res) => {
  // res.render("home.pug", { title: "Dashboard | Express Wallet" });
  // console.log('REQUEST:', req);
  res.render("home.pug", { accessToken: "bar" });
  // res.redirect('/')
});

router.get('/getbalance/:auth', async (req, res) => {
  const amount = await bank.getBalance(req.params.auth);
  res.json(amount);
});

module.exports = router;