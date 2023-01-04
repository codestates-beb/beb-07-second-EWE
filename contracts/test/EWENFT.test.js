/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const truffleAssert = require('truffle-assertions');

const EWEToken = artifacts.require('EWEToken');
const EWENFT = artifacts.require('EWENFT');
let token;
let nft;
let tokenAddr;

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
    console.log(token.address);
    nft = await EWENFT.new({ from: accounts[0] });
    await nft.setToken(tokenAddr, { from: accounts[0] });
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
    await nft.setToken(tokenAddr, { from: accounts[0] });
    console.log(await nft.getToken({ from: accounts[0] }));
    console.log(await nft.getPrice({ from: accounts[0] }));

    const amount = 10000000000000;
    const beforeBalance1 = await token.balanceOf(accounts[1]);
    assert.strictEqual('0', beforeBalance1.toString());
    await token.transfer(accounts[1], amount, { from: accounts[0] });
    const afterBalance1 = await token.balanceOf(accounts[1]);
    assert.strictEqual(amount.toString(), afterBalance1.toString());

    const allowanceValBefore = await token.allowance(accounts[1], accounts[0]);
    assert.strictEqual('0', allowanceValBefore.toString());
    await token.approve(accounts[0], amount, { from: accounts[1] });
    const allowanceVal = await token.allowance(accounts[1], accounts[0]);
    assert.strictEqual(amount.toString(), allowanceVal.toString());

    console.log(allowanceVal.toString());

    await truffleAssert.passes(nft.mintNFT(accounts[1], { from: accounts[0] }));
  });
  // it('creation: inital name, symbol, decimals, totalSupply', async () => {
  //   const _name = await token.name.call();
  //   assert.strictEqual(_name, name);

  //   const _symbol = await token.symbol.call();
  //   assert.strictEqual(_symbol, symbol);

  //   const _decimals = await token.decimals.call();
  //   assert.strictEqual(_decimals.toString(), decimals.toString());

  //   const _totalSupply = await token.totalSupply.call();
  //   assert.strictEqual(_totalSupply.toString(), totalSupply.toString());
  // });

  // it('transfer: accounts[0] to accounts[1]', async () => {
  //   const beforeBalance = await token.balanceOf.call(accounts[0]);
  //   const amount = 1000;
  //   await token.transfer(accounts[1], amount, { from: accounts[0] });

  //   const afterBalance0 = await token.balanceOf.call(accounts[0]);
  //   const afterBalance1 = await token.balanceOf.call(accounts[1]);

  //   assert.strictEqual(beforeBalance.toString(), totalSupply.toString());
  //   assert.strictEqual(
  //     afterBalance0.toString(),
  //     (BigInt(totalSupply) - BigInt(1000)).toString(),
  //   );
  //   assert.strictEqual(afterBalance1.toString(), '1000');
  // });

  // it('should have zero allowance initially', async () => {
  //   const allowanceValue0 = await token.allowance.call(
  //     accounts[0],
  //     accounts[1],
  //   );
  //   assert.strictEqual(allowanceValue0.toString(), '0');
  //   const allowanceValue1 = await token.allowance.call(
  //     accounts[1],
  //     accounts[0],
  //   );
  //   assert.strictEqual(allowanceValue1.toString(), '0');
  // });

  // it('should have proper allowance after calling approve()', async () => {
  //   const val = 20;
  //   const approveResult = await token.approve(accounts[1], val, {
  //     from: accounts[0],
  //   });
  //   const allowanceVal = await token.allowance.call(accounts[0], accounts[1]);
  //   assert.strictEqual(allowanceVal.toString(), val.toString());
  // });

  // it('should be able to transfer proper amount on approve mapping', async () => {
  //   const account0BalanceInitial = await token.balanceOf(accounts[0]);
  //   const val = 20;
  //   const approveResult = await token.approve(accounts[1], val, {
  //     from: accounts[0],
  //   });
  //   console.log(approveResult.receipt);

  //   const allowanceVal = await token.allowance(accounts[0], accounts[1]);
  //   assert.strictEqual(allowanceVal.toString(), val.toString());

  //   await token.transferFrom(accounts[0], accounts[2], 20, {
  //     from: accounts[1],
  //   });

  //   const account0Balance = await token.balanceOf(accounts[0]);
  //   const account2Balance = await token.balanceOf(accounts[2]);

  //   assert.strictEqual(account2Balance.toString(), val.toString());
  //   assert.strictEqual(
  //     account0Balance.toString(),
  //     (BigInt(account0BalanceInitial) - BigInt(val)).toString(),
  //   );
  // });

  // it('should not be able to transferFrom when sender do not enough token', async () => {
  //   const val = 20;
  //   await token.balanceOf(accounts[0]);
  //   await token.approve(accounts[1], val, {
  //     from: accounts[0],
  //   });

  //   const allowanceVal = await token.allowance(accounts[0], accounts[1]);
  //   assert.strictEqual(allowanceVal.toString(), val.toString());
  //   await truffleAssert.fails(
  //     token.transferFrom(accounts[0], accounts[2], 21, {
  //       from: accounts[1],
  //     }),
  //   );

  //   // const account0Balance = await token.balanceOf(accounts[0]);
  //   // const account2Balance = await token.balanceOf(accounts[2]);

  //   // assert.strictEqual(account2Balance.toString(), val.toString());
  //   // assert.strictEqual(
  //   //   account0Balance.toString(),
  //   //   (account0BalanceInitial - val).toString(),
  //   // );
  // });
});
