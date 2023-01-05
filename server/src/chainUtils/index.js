const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken');
const NFTABI = require('./ABIs/EWENFT');

const { WEB3NETWORK, NFTCA, TokenCA, ADMIN_PK } = process.env;
const web3Endpoint = 'http://localhost:7545';

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const tokenContract = new web3Http.eth.Contract(
  TokenABI,
  '0xF55Ee577d9A7Dfd68cdDf80268BE43ee425f8Bf8',
);

const nftContract = new web3Http.eth.Contract(
  NFTABI,
  '0x42B2e61B95c273b3aEC8c82d56C45C95BcB6a4F2',
);

const verifyContracts = async () => {
  const TokenName = await tokenContract.methods.name().call();
  const NFTName = await nftContract.methods.name().call();

  if (TokenName !== 'EWEToken')
    throw new Error(`Invalid Token name : ${TokenName}`);
  if (NFTName !== 'EWENFT') throw new Error(`Invalid Token name : ${NFTName}`);
  return true;
};

module.exports = { verifyContracts, tokenContract, nftContract, web3Http };
