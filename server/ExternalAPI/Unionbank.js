import 'regenerator-runtime/runtime';
import request from 'request-promise';
import axios from 'axios';

class UnionBank {
  constructor() {
    this.clientId = '6770ff0a-ea5e-445e-93ee-1f2665cac0ef';
    this.clientSecret = 'V5bM4hW3eH4mN0nT4bI7jR2pW1lN1pQ3oO2dE2gD1bW1xB5gA6';
  }

  async signup(username, password, account_name) {
    const options = {
      method: 'POST',
      url: 'https://api-uat.unionbankph.com/partners/sb/sandbox/v1/accounts',
      redirect_uri: 'localhost:3000/home',
      body: {
        username,
        password,
        account_name,
      },
      headers: {
        accept: 'application/json',
        'x-ibm-client-id': this.clientId,
        'x-ibm-client-secret': this.clientSecret,
      },
      json: true,
    }
    return await request(options);
  }

  async checkAccountDetails() {
    const options = {
      method: 'GET',
      url: 'https://api-uat.unionbankph.com/partners/sb/accounts/v1/info',
      headers: {
        accept: 'application/json',
        'x-ibm-client-id': this.clientId,
        'x-ibm-client-secret': this.clientSecret,
        // authorization: 'ACCESS TOKEN FROM UNIONBANK ONLINE LOGIN API'
      },
      json: true,
    };
    return await request(options);
  }

  // async onlineLogin(scope) {
  //   const options = {
  //     method: 'GET',
  //     url: '/login',
  //     qs: {
  //       client_id: this.clientId,
  //       response_type: 'token',
  //       scope: 'account_info',
  //     },
  //     redirect_uri: 'localhost:3000/home',
  //     headers: {
  //       accept: 'application/json',
  //       'Content-type': 'application/json',
  //       'x-ibm-client-id': this.clientId,
  //       'x-ibm-client-secret': this.clientSecret,
  //     }
  //   };
  //   return await request(options);
  // }

  async getBalance(auth) {
    const options = {
      method: 'GET',
      url: 'https://api-uat.unionbankph.com/partners/sb/accounts/v1/balances',
      client_id: this.clientId,
      // qs: {
      //   client_id: this.clientId,
      //   // response_type: 'token',
      //   // scope: 'account_info',
      // },
      redirect_uri: 'localhost:3000/home',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-ibm-client-id': this.clientId,
        'x-ibm-client-secret': this.clientSecret,
        authorization: 'Bearer ' + auth,
      }
    };
    return await request(options);
  }

  // async getBalance(auth) {
  //   axios.defaults.baseURL = 'https://api-uat.unionbankph.com/partners/sb';
  //   axios.defaults.headers.get['content-type'] = 'application/json';
  //   axios.defaults.headers.get['accept'] = 'application/json';
  //   axios.defaults.headers.get['x-ibm-client-id'] = this.clientId;
  //   axios.defaults.headers.get['x-ibm-client-secret'] = this.clientSecret;
  //   const path = '/accounts/v1/balances';
  //   // const auth = JSON.parse(window.localStorage.getItem('accessToken'));
  //   axios.defaults.headers.get['authorization'] = 'Bearer ' + auth;
  //   console.log('ano ka auth:', auth);
  //   // axios.defaults.headers.get['authorization'] = 'Bearer ' + auth.access_token;
    
  //   const response = await axios.get(path);
  //   console.log('balance:', response.data[0].amount);
  //   return response.data[0].amount;
  // }

  // async onlineLogin() {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://api-uat.unionbankph.com/partners/sb/convergent/v1/oauth2/authorize',
  //     qs: {
  //       client_id: this.clientId,
  //       response_type: 'token',
  //       scope: 'account_info',
  //     },
  //     redirect_uri: 'localhost:3000/home',
  //     headers: {
  //       accept: 'application/json',
  //       'Content-type': 'application/json',
  //     }
  //   };
  //   return await request(options);
  // }
}

const bankInstance = new UnionBank();
export default bankInstance;