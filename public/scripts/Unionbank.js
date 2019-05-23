const requestAuthorize = async () => {
  const token = window.localStorage.getItem('accessToken');
  await axios.get(`/unionbank/authorize/${token}`)
    .then(res => {
      console.log('TOKEN:', res.data);
      document.querySelector('#tokenText').innerHTML = res.data;
      // return res;
    })
    // .then(res => JSON.stringify(window.localStorage.setItem('accessToken', res.data)));
}

const recieveAuth = () => {
  const accessToken = window.location.search.split('=')[1];
  window.localStorage.setItem('accessToken', accessToken);
  // console.log('Access token set: ' + accessToken);
};

const getBalance = async () => {
  const container = document.querySelector('#balanceH5');
  const auth = JSON.parse(window.localStorage.getItem('accessToken'));
  await axios.get(`/home/getbalance/${auth.access_token}`)
    .then(val => {
      return JSON.parse(val.data)[0];
    })
    .then(data => container.innerHTML = `${data.currency} ${data.amount.toFixed(2)}`);
}



window.onload = async () => {
  recieveAuth();
  await requestAuthorize();
  await getBalance();
}