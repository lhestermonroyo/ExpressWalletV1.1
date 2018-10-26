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

  async getBalance(auth) {
    const options = {
      method: 'GET',
      url: 'https://api-uat.unionbankph.com/partners/sb/accounts/v1/balances',
      client_id: this.clientId,
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
}

const bankInstance = new UnionBank();
export default bankInstance;