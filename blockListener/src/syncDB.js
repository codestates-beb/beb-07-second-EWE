/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-restricted-syntax */
const {
  web3Http,
  nftContractHttp,
  tokenContractHttp,
} = require('./chainUtils');
const { nfts, users } = require('./models');

const syncUserData = async (user) => {
  try {
    const ethBalance = await web3Http.eth.getBalance(user.wallet_account);
    const tokenBalance = await tokenContractHttp.methods
      .balanceOf(user.wallet_account)
      .call();

    await user.update({
      eth: ethBalance,
      erc20: tokenBalance,
    });
  } catch (err) {
    console.error(err);
  }
};

const syncNFTData = async (nft) => {
  try {
    const ownerAddress = await nftContractHttp.methods
      .ownerOf(nft.token_id)
      .call();
    const ownerData = await users.findOne({
      where: { wallet_account: ownerAddress },
    });
    if (!ownerData) {
      throw new Error(
        `user with wallet_account : ${ownerAddress} is not exist`,
      );
    }
    await nft.update({
      user_id: ownerData.id,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = async () => {
  const userData = await users.findAll({});
  for await (const user of userData) {
    console.log(`synchronizing userId : ${user.id}`);
    await syncUserData(user);
  }
  const nftData = await nfts.findAll({});
  for await (const nft of nftData) {
    console.log(`synchronizing tokenId : ${nft.token_id}`);
    await syncNFTData(nft);
  }
};
