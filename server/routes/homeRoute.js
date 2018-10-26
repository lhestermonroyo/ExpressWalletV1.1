import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.pug", { title: "Dashboard | Express Wallet" });
});

export default router;