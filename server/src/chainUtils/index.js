const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken.json').abi;
const NFTABI = require('./ABIs/EWENFT.json').abi;
require('dotenv').config({ path: '../.env' }); // TODO: remove later

const { WEB3NETWORK, NFT_CA, TOKEN_CA, ADMIN_PK } = process.env;
const web3Endpoint = 'http://127.0.0.1:8545';

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const tokenContract = new web3Http.eth.Contract(TokenABI, TOKEN_CA);
const nftContract = new web3Http.eth.Contract(NFTABI, NFT_CA);

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
