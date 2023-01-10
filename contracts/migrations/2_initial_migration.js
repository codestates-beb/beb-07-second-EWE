// this script migrates EWENFT
const EWENFT = artifacts.require('EWENFT');
const EWEToken = artifacts.require('EWEToken');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(EWENFT);
  const contract = await EWENFT.deployed();
  const token = await EWEToken.deployed();
  await contract.setToken(token.address);
  // some predefined mint logics
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  await contract.mintNFT(accounts[0], { from: accounts[0] });
  const tokenId = await contract.getTokenId();
  console.log({ tokenId });
  if (tokenId.toString() !== '10') throw new Error('token id should be 10');
};
