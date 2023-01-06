const { nftContract, web3Http } = require('./index');
require('dotenv').config({ path: '../.env' });
// TODO: remove later
const {
  ADMIN_ADDRESS,
  ADMIN_PK,
  TOKEN_CA,
  NFT_CA,
  USER_ADDRESS,
  USER_PK,
  GAS,
  GASPRICE,
} = process.env;

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

console.log({ ADMIN_PK, GAS, GASPRICE });

const getCurrentTokenId = async () => {
  // const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const currentTokenId = await nftContract.methods.getTokenId().call();
  return currentTokenId;
  // const bytedata = await nftContract.methods.getTokenId().encodeABI();
  // const tx = {
  //   from: adminAccount.address,
  //   to: TOKEN_CA,
  //   gas: GAS,
  //   gasPrice: GASPRICE,
  //   data: bytedata,
  // };
  // return signAndSendTx(adminAccount, tx);
  // return currentTokenId;
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
// const getTokenUri;
// const getAccountsNFT
// const transferNFT;
// const mintNFT;
const test = async () => {
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

test();

module.exports = {
  getCurrentTokenId,
  giveWelcomeNFT,
  getMyNFTBalance,
  getNFTOwner,
};
