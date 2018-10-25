const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup.pug", { title: "Sign Up | Express Wallet" });
});

module.exports = router;
