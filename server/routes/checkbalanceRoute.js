import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("checkbalance.pug", { title: "Check Balance | Express Wallet" });
});

export default router;