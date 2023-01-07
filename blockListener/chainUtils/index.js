const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken.json').abi;
const NFTABI = require('./ABIs/EWENFT.json').abi;
require('dotenv').config({ path: '../.env' }); // TODO: remove later

const { NODE_ENV, WEB3NETWORK, NFT_CA, TOKEN_CA, ADMIN_PK } = process.env;
let web3Endpoint;
if (NODE_ENV === 'remote_test') {
  web3Endpoint = 'ws://20.214.190.113:8545';
} else {
  web3Endpoint = 'ws://127.0.0.1:8545';
}

console.log({ NODE_ENV, web3Endpoint });

const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider('ws://20.214.190.113:8545'),
);

const tokenContract = new web3Socket.eth.Contract(TokenABI, TOKEN_CA);
const nftContract = new web3Socket.eth.Contract(NFTABI, NFT_CA);

const verifyContracts = async () => {
  const TokenName = await tokenContract.methods.name().call();
  const NFTName = await nftContract.methods.name().call();

  if (TokenName !== 'EWEToken')
    throw new Error(`Invalid Token name : ${TokenName}`);
  if (NFTName !== 'EWENFT') throw new Error(`Invalid Token name : ${NFTName}`);
  return true;
};

verifyContracts();

module.exports = { verifyContracts, tokenContract, nftContract, web3Socket };
