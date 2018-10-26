import express from 'express';
import mongoose from 'mongoose';
import bank from '../ExternalAPI/Unionbank';
import request from 'request-promise';
import axios from 'axios';
import util from 'util';
import { exec } from 'child_process';
import { clientId, clientSecret } from '../constants';
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.pug", { title: "Log In | Express Wallet" });
});

let Accounts = require("../../models/accounts");

router.post("/login", async (req, res) => {
  // return await bank.onlineLogin();
  // const scope = 'account_info';
  const scope = 'account_balances';
  const redirect = 'http://localhost:3000/home';
  axios.defaults.baseURL = 'https://api-uat.unionbankph.com/partners/sb';
  axios.defaults.headers.post['content-type'] = 'text/html';
  axios.defaults.headers.post['accept'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post['x-ibm-client-id'] = clientId;
  axios.defaults.headers.post['x-ibm-client-secret'] = clientSecret;
  const path = `/convergent/v1/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirect}`;
  const response = await axios.get(path);
  // console.log('response: ', response.data);
  const redirectURI = response.request.res.req.agent.protocol + '//' + response.request.res.connection._host + response.request.path;
  // res.redirect(redirect);
  res.redirect(redirectURI);
});

router.get('/unionbank/authorize/:code', (req, res) => {
  /**
    * Resorted to using cURL because request() and axios() failed to work.
    * Getting { "error":"invalid_grant" } consistently. #hack
   */
  const { code } = req.params;
  const redirect_uri = 'http://localhost:3000/home';
  // const redirect_uri = 'http%3A%2F%2Flocalhost%3A3030%2Fhome';

  const options = {
    method: 'GET',
    url: 'https://api-uat.unionbankph.com/partners/sb/convergent/v1/oauth2/token',
    
  }

  const command = `curl https://api-uat.unionbankph.com/partners/sb/convergent/v1/oauth2/token -H "accept: application/json" -H "content-type: application/x-www-form-urlencoded" -H "x-ibm-client-id: ${clientId}" -H "x-ibm-client-secret: ${clientSecret}" -X POST -d "grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirect_uri}&code=${code}"`;
  
  exec(command, (err, stdout) => {
    if (err) {
      // console.log(err);
      res.send();
      return;
    }

    // console.log(`${stdout}`);
    res.json(stdout);
  });
});

export default router;