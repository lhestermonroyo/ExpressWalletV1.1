const express = require("express");
const router = express.Router();
const Accounts = require("../../models/accounts");
const config = require("../../config/database");
const crypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("deposit.pug", { title: "Deposit | Express Wallet" });
});

router.post("/add/:id", (req, res) => {
  Accounts.findById({ _id: req.params.id }, (err, account) => {
    if (err) {
      console.log(err);
    }

    console.log(account.email);

    crypt.compare(req.body.password, account.password, (err, match) => {
      if (err) {
        console.log(err);
      }

      if (match) {
        console.log("Matched!");
        let updateBalance = new Accounts({
          balance: req.body.amount
        });

        let query = { _id: req.param.id };

        Accounts.updateOne(query, updateBalance, err => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log("Deposit successful!");
            console.log(updateBalance.balance);
            res.redirect("/deposit");
          }
        });
      } else {
        console.log("Not matched!");
      }
    });
  });

  // Accounts.find({ _id: req.params.id }, (err, account) => {
  //   console.log(account.password);
  //   crypt.compare(req.body.password, req.body.password, (err, match) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (match) {
  //       let transactions = new Transactions({
  //         transaction_type: "Deposit",
  //         sender: req.params.id,
  //         recepient: "Express Wallet",
  //         amount: req.body.amount,
  //         wallet_balance: 50000
  //       });
  //       req.flash(
  //         "success",
  //         `${req.params.id} have deposited P${req.body.amount} in your wallet.`
  //       );
  //       res.redirect("/deposit");
  //     } else {
  //       req.flash("danger", "Password not matched");
  //       res.redirect("/deposit");
  //     }
  //   });
  // });
});

module.exports = router;
