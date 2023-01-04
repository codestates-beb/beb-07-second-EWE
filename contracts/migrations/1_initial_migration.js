// this script migrates EWEToken
const EWEToken = artifacts.require('EWEToken');
module.exports = function (deployer) {
  deployer.deploy(EWEToken, 'EWEToken', 'EWE');
};
