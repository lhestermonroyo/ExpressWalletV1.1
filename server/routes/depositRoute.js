const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("deposit.pug", { title: "Deposit | Express Wallet" });
});

module.exports = router;