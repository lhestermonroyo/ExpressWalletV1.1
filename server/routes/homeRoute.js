import express from 'express';
import bank from '../ExternalAPI/Unionbank';
import util from 'util';
import { exec } from 'child_process';
import { clientId, clientSecret } from '../constants';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.pug", { title: "Dashboard | Express Wallet" });
});

router.get('/getbalance/:auth', async (req, res) => {
  const amount = await bank.getBalance(req.params.auth);
  res.json(amount);
});

export default router;