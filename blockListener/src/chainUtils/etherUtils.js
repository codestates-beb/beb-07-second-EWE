const { web3Http } = require('./index');

const { ADMIN_ADDRESS } = process.env;

const getEtherBalance = async (account) => {
  const balance = await web3Http.eth.getBalance(account);
  return balance;
};

// default faucet value = 0.01ETH
const useEtherFaucet = async (recipient, value = '10000000000000000') => {
  try {
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { getEtherBalance, useEtherFaucet };
