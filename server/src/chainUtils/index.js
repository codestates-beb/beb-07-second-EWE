const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken');
const NFTABI = require('./ABIs/EWENFT');
// require('dotenv').config({ path: '../../.env' }); // TODO: remove later

const { WEB3NETWORK, NFTCA, TokenCA, ADMIN_PK } = process.env;
const web3Endpoint = 'http://localhost:7545';

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const tokenContract = new web3Http.eth.Contract(
  TokenABI,
  '0x385E03e458921a37EdCDF9E59cB5AFBa142b6F97',
);

const nftContract = new web3Http.eth.Contract(
  NFTABI,
  '0x7aD8F6DAea1855325C8531745e411497Ee406a16',
);

const verifyContracts = async () => {
  const TokenName = await tokenContract.methods.name().call();
  const NFTName = await nftContract.methods.name().call();

  if (TokenName !== 'EWEToken')
    throw new Error(`Invalid Token name : ${TokenName}`);
  if (NFTName !== 'EWENFT') throw new Error(`Invalid Token name : ${NFTName}`);
  return true;
};

verifyContracts();

module.exports = { verifyContracts, tokenContract, nftContract, web3Http };
