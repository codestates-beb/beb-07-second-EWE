const { nftContract, web3Http } = require('./index');
const { getTokenBalance, approveTokenToAdmin } = require('./tokenUtils');

const { ADMIN_PK, NFT_CA, USER_ADDRESS, USER_PK, GAS, GASPRICE } = process.env;

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

const getCurrentTokenId = async () => {
  const currentTokenId = await nftContract.methods.getTokenId().call();
  return currentTokenId;
};

const giveWelcomeNFT = async (to, tokenId) => {
  try {
    const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
    const bytedata = await nftContract.methods
      .transferFrom(adminAccount.address, to, tokenId)
      .encodeABI();
    const tx = {
      from: adminAccount.address,
      to: NFT_CA,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getMyNFTBalance = async (account) => {
  try {
    const NFTBalance = await nftContract.methods.balanceOf(account).call();
    return NFTBalance;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getNFTOwner = async (tokenId) => {
  try {
    const ownerAddress = await nftContract.methods.ownerOf(tokenId).call();
    return ownerAddress;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const approveAllNFTToAdmin = async (ownerPK) => {
  try {
    const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
    const ownerAccount = web3Http.eth.accounts.privateKeyToAccount(ownerPK);
    const bytedata = await nftContract.methods
      .setApprovalForAll(adminAccount.address, true)
      .encodeABI();
    const tx = {
      from: ownerAccount.address,
      to: NFT_CA,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(ownerAccount, tx);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const isNFTApprovedForAll = async (ownerPK) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const ownerAccount = web3Http.eth.accounts.privateKeyToAccount(ownerPK);
  try {
    const result = await nftContract.methods
      .isApprovedForAll(ownerAccount.address, adminAccount.address)
      .call();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const transferNFT = async (from, to, tokenId) => {
  // admin transfers nfts on behalf of owner
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const bytedata = await nftContract.methods
    .transferFrom(from, to, tokenId)
    .encodeABI();
  const tx = {
    from: adminAccount.address,
    to: NFT_CA,
    gas: GAS,
    gasPrice: GASPRICE,
    data: bytedata,
  };
  return signAndSendTx(adminAccount, tx);
};

const mintNFT = async (to) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const bytedata = await nftContract.methods.mintNFT(to).encodeABI();
  const tx = {
    from: adminAccount.address,
    to: NFT_CA,
    gas: GAS,
    gasPrice: GASPRICE,
    data: bytedata,
  };
  return signAndSendTx(adminAccount, tx);
};

const test = async () => {
  // TODO: remove test
  console.log(await getCurrentTokenId());
  console.log(await getNFTOwner(10));
  console.log(
    await getMyNFTBalance('0xBb61b10e455b7375BA796A309F19598042Ac2571'),
  );
  console.log('-------after welcome gift--------');
  await giveWelcomeNFT(USER_ADDRESS, 10);
  console.log(await getNFTOwner(10));
  console.log(
    await getMyNFTBalance('0xBb61b10e455b7375BA796A309F19598042Ac2571'),
  );
};
const approvaltest = async () => {
  // TODO: remove test
  console.log('-------before approval called--------');
  console.log(await getCurrentTokenId());
  console.log(await getNFTOwner(5));
  console.log(await giveWelcomeNFT(USER_ADDRESS, 5));
  console.log(await getNFTOwner(5));
  console.log(await isNFTApprovedForAll(USER_PK));
  console.log('-------after approval called--------');
  await approveAllNFTToAdmin(USER_PK);
  console.log(await isNFTApprovedForAll(USER_PK));
};
// test(); TODO: remove test

const transferTest = async () => {
  if ((await getNFTOwner(5)) !== USER_ADDRESS)
    throw new Error('owner not correct');
  transferNFT(USER_ADDRESS, '0xF226b85eC59807932939501165Dff24Ebf419A35', 5);
  console.log(await getNFTOwner(5));
};

const main = async () => {
  console.log(await getNFTOwner(5));
  // await approvaltest();
  // await transferTest();
};
// main();
const mintTest = async () => {
  console.log('mintTest called');
  const targetAddr = '0xF226b85eC59807932939501165Dff24Ebf419A35';
  const targetPK =
    '0xacada6a3ec939deffeb87c41f194b35b42f372526905ada9bae4ad43da884de2';
  await approveTokenToAdmin(targetPK);
  console.log(await getCurrentTokenId());
  await mintNFT(targetAddr);
  console.log('------------ after mint --------');
  console.log(await getCurrentTokenId());
  console.log(await getNFTOwner(await getCurrentTokenId()));
  console.log(await getTokenBalance(targetAddr));
};
// mintTest();

module.exports = {
  getCurrentTokenId,
  giveWelcomeNFT,
  getMyNFTBalance,
  getNFTOwner,
  approveAllNFTToAdmin,
  transferNFT,
  mintNFT,
};
