// this script migrates EWENFT
const EWENFT = artifacts.require('EWENFT');
module.exports = function (deployer) {
  deployer.deploy(EWENFT);
};
