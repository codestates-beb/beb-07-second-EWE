const { tokenContract, web3Http } = require('./index');
require('dotenv').config({ path: '../../.env' }); // TODO: remove later

const { ADMIN_ADDRESS, ADMIN_PK, TOKEN_CA } = process.env;

const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);

const signAndSendTx = async (tx) => {
  const signedTx = await adminAccount.signTransaction(tx);
  const sentTx = await web3Http.eth.sendSignedTransaction(
    signedTx.raw || signedTx.rawTransaction,
  );
  return sentTx;
};

const transferToken = async (to, amount) => {
  try {
    const bytedata = await tokenContract.methods
      .transfer(to, amount)
      .encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: TOKEN_CA,
      gas: 100000,
      gasPrice: '21000000000',
      data: bytedata,
    };
    return signAndSendTx(tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

transferToken('0x79547ddA22E82074a171E5Ba657bBe1D2e2B7ca3', 33333333);

// const approveToken;
// const getTokenBalance;h
// const getEtherBalance;
// const getEtherFaucet;
