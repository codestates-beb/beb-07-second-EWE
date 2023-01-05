const { web3Http } = require('./index');

const createAccount = async () => {
  const newAcount = await web3Http.eth.accounts.create('ewe to the moon');
  return newAcount;
};

module.exports = {
  createAccount,
};
