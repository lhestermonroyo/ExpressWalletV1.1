import express from 'express';
import mongoose from 'mongoose';
import bank from '../ExternalAPI/Unionbank';
const router = express.Router();

let Accounts = require("../../models/accounts");
router.get("/", (req, res) => {
  Accounts.find({}, (err, accounts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("signup.pug", {
        title: "Sign Up | Express Wallet",
        accounts: accounts
      });
    }
  });
});


router.post("/add", async (req, res) => {
  const { account_name, username, email, password } = req.body;
  await bank.signup(username, password, account_name)
  req.flash('success', 'Registration Successful');
  res.redirect('http://localhost:3000/');
  return;
});

// router.post("/add", (req, res) => {
//   let getAccount = Accounts.find({ email: req.body.email }, (err, account) => {
//     if (err) {
//       return null;
//     } else {
//       return req.body.email;
//     }
//   });

//   if (getAccount != req.body.email) {
//     let account = new Accounts();
//     account.firstname = req.body.firstname;
//     account.lastname = req.body.lastname;
//     account.email = req.body.email;
//     account.password = req.body.password;


//     account.save(err => {
//       if (err) {
//         console.log(err);
//       } else {
//         req.flash("success", "Registration successful!");
//         res.redirect("/");
//       }
//     });
//   } else {
//     console.log("Error");
//   }
// });

// account.save(err => {
//   if (err) {
//     console.log(err);
//   } else {
//     req.flash("success", "Registration successful!");
//     res.redirect("/");
//   }
// });

export default router;