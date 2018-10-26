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
  console.log('auth:', auth.access_token);
  await axios.get(`/home/getbalance/${auth.access_token}`)
    .then(value => container.innerHTML = `P${value}`);
}



window.onload = async () => {
  recieveAuth();
  await requestAuthorize();
  await getBalance();
}