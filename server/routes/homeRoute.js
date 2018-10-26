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
  // console.log('ani ni ang auth:', req.params.auth);
  const amount = await bank.getBalance(req.params.auth);
  res.json(amount);
});

// router.get('/getbalance/:auth', (req, res) => {
//   const command = `curl 'https://api-uat.unionbankph.com/partners/sb/accounts/v1/balances'
//   -H 'accept: application/json'
//   -H 'content-type: application/json'
//   -H 'x-ibm-client-id: ${clientId}'
//   -H 'x-ibm-client-secret: ${clientSecret}'
//   -H 'authorization: Bearer ${req.params.auth}'`;

//   return exec(command, (err, stdout) => {
//     if (err) {
//       console.log('ERROR:', err);
//       res.send();
//       return;
//     }

//     console.log(`STDOUT: ${stdout}`);
//     res.json(stdout);
//   });
// });

export default router;