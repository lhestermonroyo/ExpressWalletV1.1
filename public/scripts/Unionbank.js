const requestAuthorize = async () => {
  // console.log('Requesting token...');
  const token = window.localStorage.getItem('accessToken');
  await axios.get(`/unionbank/authorize/${token}`)
    .then(res => {
      console.log('RESULT:', res);
      return res;
    })
    .then(res => JSON.stringify(window.localStorage.setItem('accessToken', res.data)));
  // console.log('THE TOKEN:', window.localStorage.getItem('accessToken'));
}

const recieveAuth = () => {
  const accessToken = window.location.search.split('=')[1];
  window.localStorage.setItem('accessToken', accessToken);
  // console.log('Access token set: ' + accessToken);
};

const getBalance = async () => {
  const container = document.querySelector('#balanceH5');
  const auth = JSON.parse(window.localStorage.getItem('accessToken'));
  // console.log('auth:', auth.access_token);
  await axios.get(`/home/getbalance/${auth.access_token}`)
    .then(val => {
      console.log('val:', val.data, 'parsed:', JSON.parse(val.data)[0]);
      return JSON.parse(val.data)[0];
    })
    .then(data => container.innerHTML = `${data.currency} ${data.amount}`);
}

// const getBalance = async () => {
//     axios.defaults.baseURL = 'https://api-uat.unionbankph.com/partners/sb';
//     axios.defaults.headers.get['content-type'] = 'application/json';
//     axios.defaults.headers.get['accept'] = 'application/json';
//     axios.defaults.headers.get['x-ibm-client-id'] = '6770ff0a-ea5e-445e-93ee-1f2665cac0ef';
//     axios.defaults.headers.get['x-ibm-client-secret'] = 'V5bM4hW3eH4mN0nT4bI7jR2pW1lN1pQ3oO2dE2gD1bW1xB5gA6';
//     const path = '/accounts/v1/balances';
//     const auth = JSON.parse(window.localStorage.getItem('accessToken'));
//     axios.defaults.headers.get['authorization'] = 'Bearer ' + auth.access_token;
    
//     const response = await axios.get(path);
//     console.log('balance:', response.data[0].amount);
//     return response.data[0].amount;
// }



window.onload = async () => {
  recieveAuth();
  await requestAuthorize();
  await getBalance();
}