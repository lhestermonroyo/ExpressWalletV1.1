const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.pug", { title: "Log In | Express Wallet" });
});

module.exports = router;
