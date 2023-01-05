const Web3 = require('web3');

const web3Http = new Web3(
  new Web3.providers.HttpProvider('http://localhost:7545'),
);
const getTxData = async (txHash) => {
  const result = await web3Http.eth.getTransaction(txHash);
  return result;
};

const main = async () => {
  console.log(
    await getTxData(
      '0xd78a6ef8f1956a3327c95dd1d543b6c9b98fb6f92e1f5f0e00a9db9450de29eb',
    ),
  );
};

main();
