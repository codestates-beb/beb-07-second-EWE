/* eslint-disable global-require */
require('dotenv').config({ path: '../.env' });

if (require.main === module) {
  console.log('index.js running independently');
  require('dotenv').config({ path: '../.env' });
}
const { WEB3NETWORK, NFT_CA, TOKEN_CA, ADMIN_PK } = process.env;
if (!ADMIN_PK) throw new Error('.env not configured!');

const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken.json').abi;
const NFTABI = require('./ABIs/EWENFT.json').abi;

let web3Endpoint;
if (WEB3NETWORK === 'remote') {
  web3Endpoint = 'http://20.214.190.113:8545';
} else if (WEB3NETWORK === 'local') {
  web3Endpoint = 'http://127.0.0.1:8545';
} else {
  throw new Error('MUST Provide WEB3NETWORK CONFIG, check .env');
}

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const tokenContract = new web3Http.eth.Contract(TokenABI, TOKEN_CA);
const nftContract = new web3Http.eth.Contract(NFTABI, NFT_CA);

const verifyContracts = async () => {
  const TokenName = await tokenContract.methods.name().call();
  const NFTName = await nftContract.methods.name().call();

  if (TokenName !== 'EWEToken')
    throw new Error(`Invalid Token name : ${TokenName}`);
  if (NFTName !== 'EWENFT') throw new Error(`Invalid Token name : ${NFTName}`);
  console.log('Contracts setup done');
  return true;
};

verifyContracts();

module.exports = { verifyContracts, tokenContract, nftContract, web3Http };
