/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const truffleAssert = require('truffle-assertions');

const EWEToken = artifacts.require('EWEToken');
const EWENFT = artifacts.require('EWENFT');
let token;
let nft;
let tokenAddr;
let nftPrice;

contract('EWENFT', (accounts) => {
  const name = 'EWEToken';
  const symbol = 'EWE';
  const decimals = 18;
  const totalSupply = '100000000000000000000000000';

  beforeEach(async () => {
    token = await EWEToken.new(name, symbol, {
      from: accounts[0],
    });
    tokenAddr = token.address;
    nft = await EWENFT.new({ from: accounts[0] });
    nftPrice = await nft.getPrice();
    await nft.setToken(tokenAddr, { from: accounts[0] });
  });

  it('should have proper token uri per tokenId', async () => {
    const amount = 10000000000000;

    await token.transfer(accounts[1], amount, { from: accounts[0] });
    await token.approve(accounts[0], amount, { from: accounts[1] });
    await truffleAssert.passes(nft.mintNFT(accounts[1], { from: accounts[0] }));
    await truffleAssert.passes(nft.mintNFT(accounts[1], { from: accounts[0] }));

    const token1URI = await nft.tokenURI(1);
    assert.strictEqual(
      'https://ewe-metadata.s3.ap-northeast-2.amazonaws.com/1.json',
      token1URI,
    );

    const token2URI = await nft.tokenURI(2);
    assert.strictEqual(
      'https://ewe-metadata.s3.ap-northeast-2.amazonaws.com/2.json',
      token2URI,
    );
  });

  it('should set token propery', async () => {
    // await nft.setToken(tokenAddr, { from: accounts[0] });
    const erc20 = await nft.getToken({ from: accounts[0] });
    assert.strictEqual(erc20, tokenAddr);
  });

  it('should not be able to mint to accounts[0] itself', async () => {
    // await nft.setToken(tokenAddr, { from: accounts[0] });
    const erc20 = await nft.getToken({ from: accounts[0] });
    assert.strictEqual(erc20, tokenAddr);

    await truffleAssert.fails(nft.mintNFT(accounts[0], { from: accounts[0] }));
  });

  it('should fail to mint without setting allowance', async () => {
    await truffleAssert.fails(nft.mintNFT(accounts[1], { from: accounts[0] }));
  });

  it('should be able to mint after setting valid allowance', async () => {
    const amount = 10000000000000;
    const beforeBalance1 = await token.balanceOf(accounts[1]);
    assert.strictEqual('0', beforeBalance1.toString());
    await token.transfer(accounts[1], amount, { from: accounts[0] });
    const afterBalance1 = await token.balanceOf(accounts[1]);
    assert.strictEqual(amount.toString(), afterBalance1.toString());

    const allowanceValBefore = await token.allowance(accounts[1], accounts[0]);
    assert.strictEqual('0', allowanceValBefore.toString());

    await truffleAssert.fails(nft.mintNFT(accounts[1], { from: accounts[0] }));

    await token.approve(accounts[0], amount, { from: accounts[1] });
    const allowanceVal = await token.allowance(accounts[1], accounts[0]);
    assert.strictEqual(amount.toString(), allowanceVal.toString());

    await truffleAssert.passes(nft.mintNFT(accounts[1], { from: accounts[0] }));
  });

  it('should have proper allowance and balance after minting', async () => {
    const amount = 10000000000000;

    await token.transfer(accounts[1], amount, { from: accounts[0] });
    const beforeMintBalance = await token.balanceOf(accounts[1]);
    await token.approve(accounts[0], amount, { from: accounts[1] });
    await truffleAssert.passes(nft.mintNFT(accounts[1], { from: accounts[0] }));
    const afterMintBalance = await token.balanceOf(accounts[1]);
    const allowanceVal = await token.allowance(accounts[1], accounts[0]);
    assert.strictEqual(
      allowanceVal.toString(),
      (BigInt(amount) - BigInt(nftPrice)).toString(),
      'allowance should be decreased by nftPrice',
    );

    assert.strictEqual(
      afterMintBalance.toString(),
      (BigInt(beforeMintBalance) - BigInt(nftPrice)).toString(),
      'balance should be decreased by nftPrice',
    );
  });
});
