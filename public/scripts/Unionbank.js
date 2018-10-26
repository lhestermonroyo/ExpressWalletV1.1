const requestAuthorize = () => {
  console.log('Requesting token...');
  const token = window.localStorage.getItem('accessToken');
  axios.get(`/unionbank/authorize/${token}`)
    .then(res => window.localStorage.setItem('accessToken', res.data));
  console.log('THE TOKEN:', window.localStorage.getItem('accessToken'));
}

const recieveAuth = () => {
  const accessToken = window.location.search.split('=')[1];
  window.localStorage.setItem('accessToken', accessToken);
  console.log('Access token set: ' + accessToken);
};

const getBalance = () => {
  const container = document.querySelector('#balanceH5');
  const auth = window.localStorage.getItem('accessToken');
  axios.get(`/home/getbalance/${auth}`)
    .then(value => container.innerHTML = `P${value}`);
}



window.onload = () => {
  recieveAuth();
  requestAuthorize();
  getBalance();
}