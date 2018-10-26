import express from 'express';
import bank from '../ExternalAPI/Unionbank';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.pug", { title: "Dashboard | Express Wallet" });
});

router.get('/getbalance/:auth', async (req, res) => {
  console.log('ani ni ang auth:', req.params.auth);
  const amount = await bank.getBalance(req.params.auth);
  res.json(amount);
})

export default router;