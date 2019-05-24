import express from 'express';
import bank from '../ExternalAPI/Unionbank';
import request from 'request-promise';
import axios from 'axios';
import util from 'util';
import { exec } from 'child_process';
import { clientId, clientSecret } from '../constants';
require('dotenv').config();
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.pug", { title: "Log In | Express Wallet" });
});

router.post("/login", async (req, res) => {
  // const scope = 'account_info';
  console.log('TRANSACTION TYPE:', req.body.transaction_type);
  const scope = req.body.transaction_type;
  const redirect = 'http://google.com';
  axios.defaults.baseURL = 'https://api-uat.unionbankph.com/partners/sb';
  axios.defaults.headers.post['content-type'] = 'text/html';
  axios.defaults.headers.post['accept'] = 'application/x-www-form-urlencoded';
  const redirect_uri = process.env.REDIRECT_URI;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const path = `https://api-uat.unionbankph.com/partners/sb//convergent/v1/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}`;
  // const path = 'https://api-uat.unionbankph.com/partners/sb//convergent/v1/oauth2/authorize?response_type=code&client_id=385444c4-d6f3-4ba2-b94f-ed6a2f564361&redirect_uri=http:google.com&scope=payments';
  const response = await axios.get(path);
  const redirectURI = response.request.res.req.agent.protocol + '//' + response.request.res.connection._host + response.request.path;
  res.redirect(redirectURI);
});


router.get('/unionbank/authorize/:code', (req, res) => {
  /**
    * Resorted to using cURL because request() and axios() failed to work.
    * Getting { "error":"invalid_grant" } consistently. #hack
   */
  const { code } = req.params;
  // console.log('CODE:', code);
  // const redirect_uri = 'http://localhost:3000/home';
  const redirect_uri = process.env.REDIRECT_URI;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  // const redirect_uri = 'http%3A%2F%2Flocalhost%3A3030%2Fhome';

  const options = {
    method: 'GET',
    url: 'https://api-uat.unionbankph.com/partners/sb/convergent/v1/oauth2/token',
    
  }

  const command = `curl https://api-uat.unionbankph.com/partners/sb/convergent/v1/oauth2/token -H "accept: application/json" -H "content-type: application/x-www-form-urlencoded" -H "x-ibm-client-id: ${clientId}" -H "x-ibm-client-secret: ${clientSecret}" -X POST -d "grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirect_uri}&code=${code}"`;
  
  exec(command, (err, stdout) => {
    if (err) {
      res.send();
      return;
    }
    console.log('ERROR:', err);
    console.log('-------------------------------------------------------');
    // console.log('STDOUT:', stdout);
    console.log('access token:', JSON.parse(stdout).access_token);
    const accessToken = JSON.parse(stdout).access_token;
    // res.json(stdout);
    // res.render("home.pug", { accessToken });
    res.json(accessToken);
  });
});

export default router;