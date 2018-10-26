import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("withdraw.pug", { title: "Withdraw | Express Wallet" });
});

export default router;