import bills from './billspaymentRoute';
import balance from './billspaymentRoute';
import deposit from './depositRoute';
import fundTransfer from './fundtransferRoute';
import home from './homeRoute';
import index from './indexRoute';
import signup from './signupRoute';
import history from './transactionhistoryRoute';
import withdraw from './withdrawRoute';

const setRoutes = (app) => (
  app
    .use('/', index)
    .use('/signup', signup)
    .use('/home', home)
    .use('/fundtransfer', fundTransfer)
    .use('/checkbalance', balance)
    .use('/deposit', deposit)
    .use('/billspayment', bills)
    .use('/transactionhistory', history)
    .use('/withdraw', withdraw)
);

export default setRoutes;