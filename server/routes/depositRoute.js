const express = require("express");
const router = express.Router();
const Accounts = require("../../models/accounts");
const Transactions = require("../../models/transactions");
const config = require("../../config/database");
const crypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("deposit.pug", { title: "Deposit | Express Wallet" });
});

router.post("/add/:id", (req, res) => {
  Accounts.find({ _id: req.params.id }, (err, account) => {
    console.log(account.password);
    crypt.compare(req.body.password, req.body.password, (err, match) => {
      if (err) {
        console.log(err);
      }
      if (match) {
        let transactions = new Transactions({
          transaction_type: "Deposit",
          sender: req.params.id,
          recepient: "Express Wallet",
          amount: req.body.amount,
          wallet_balance: 50000
        });
        req.flash(
          "success",
          `${req.params.id} have deposited P${req.body.amount} in your wallet.`
        );
        res.redirect("/deposit");
      } else {
        req.flash("danger", "Password not matched");
        res.redirect("/deposit");
      }
    });
  });
});

module.exports = router;
