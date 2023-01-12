const { tokenContract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, TOKEN_CA, USER_ADDRESS, GAS, GASPRICE } =
  process.env;

const signAndSendTx = async (account, tx) => {
  try {
    const signedTx = await account.signTransaction(tx);
    const sentTx = await web3Http.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    return sentTx;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTokenBalance = async (account) => {
  try {
    const balance = await tokenContract.methods.balanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const transferTokenToUser = async (to, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try {
    const bytedata = await tokenContract.methods
      .transfer(to, amount)
      .encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: TOKEN_CA,
      amount,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const approveTokenToAdmin = async (ownerPK) => {
  try {
    const userAccount = web3Http.eth.accounts.privateKeyToAccount(ownerPK);
    const userTokenBalance = await getTokenBalance(userAccount);
    const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
    const bytedata = await tokenContract.methods
      .approve(adminAccount.address, userTokenBalance)
      .encodeABI();
    const tx = {
      spender: adminAccount.address,
      from: userAccount.address,
      to: TOKEN_CA,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(userAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const spendApprovedToken = async (sender, recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try {
    const bytedata = await tokenContract.methods
      .transferFrom(sender, recipient, amount)
      .encodeABI();
    // console.log(bytedata);
    const tx = {
      from: adminAccount.address,
      to: TOKEN_CA,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const initialTest = async () => {
  console.log('before send eth');
  console.log(await web3Http.eth.getBalance(ADMIN_ADDRESS));
  console.log(await web3Http.eth.getBalance(USER_ADDRESS));

  await web3Http.eth.sendTransaction({
    from: ADMIN_ADDRESS,
    to: USER_ADDRESS,
    value: '100000000000000000',
  });

  console.log('after send eth');
  console.log(await web3Http.eth.getBalance(ADMIN_ADDRESS));
  console.log(await web3Http.eth.getBalance(USER_ADDRESS));

  console.log('admin', await getTokenBalance(ADMIN_ADDRESS));

  await transferTokenToUser(USER_ADDRESS, '100000000'); // admin transfer token to user
  await approveTokenToAdmin(USER_ADDRESS); // user approve amount to admin
  console.log('admin', await getTokenBalance(ADMIN_ADDRESS));
  console.log('user1', await getTokenBalance(USER_ADDRESS));

  console.log(
    'allowance',
    await tokenContract.methods.allowance(USER_ADDRESS, ADMIN_ADDRESS).call(),
  );

  await spendApprovedToken(
    USER_ADDRESS,
    '0x34313f816183d2AF84f9fDe94Df9cDdcA8fF6216',
    '10000000',
  );
  console.log('user1', await getTokenBalance(USER_ADDRESS));
  console.log(
    'user2',
    await getTokenBalance('0x34313f816183d2AF84f9fDe94Df9cDdcA8fF6216'),
  );
};

module.exports = {
  getTokenBalance,
  transferTokenToUser,
  approveTokenToAdmin,
  spendApprovedToken,
};
