// this script migrates EWEToken
const EWEToken = artifacts.require('EWEToken');
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(EWEToken, 'EWEToken', 'EWE');
  const token = await EWEToken.deployed();
  const balance = await token.balanceOf(accounts[0]);
  token.approve(accounts[0], balance.toString());
  // const contract = await EWEToken.deployed();
  // console.log(
  //   await contract.transfer(accounts[1], 9999, { from: accounts[0] }),
  // );
};
