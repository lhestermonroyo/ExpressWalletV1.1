import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("deposit.pug", { title: "Deposit | Express Wallet" });
});

export default router;