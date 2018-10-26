import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("transactionhistory.pug", {
    title: "Transaction History | Express Wallet"
  });
});

export default router;