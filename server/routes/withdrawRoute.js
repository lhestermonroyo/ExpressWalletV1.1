const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("withdraw.pug", { title: "Withdraw | Express Wallet" });
});

module.exports = router;
