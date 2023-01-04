// this script migrates EWEToken
const EWEToken = artifacts.require('EWEToken');
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(EWEToken, 'EWEToken', 'EWE');
  // const contract = await EWEToken.deployed();
  // console.log(
  //   await contract.transfer(accounts[1], 9999, { from: accounts[0] }),
  // );
};
