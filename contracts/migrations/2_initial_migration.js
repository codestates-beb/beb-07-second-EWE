// this script migrates EWENFT
const EWENFT = artifacts.require('EWENFT');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(EWENFT);
  const contract = await EWENFT.deployed();
  // some predefined mint logics
};
