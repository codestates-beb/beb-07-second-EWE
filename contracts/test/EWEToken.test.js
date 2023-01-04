/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const truffleAssert = require('truffle-assertions');

const EWEToken = artifacts.require('EWEToken');
let token;

contract('EWEToken', (accounts) => {
  const name = 'EWEToken';
  const symbol = 'EWE';
  const decimals = 18;
  const totalSupply = '1000000';

  beforeEach(async () => {
    token = await EWEToken.new({
      from: accounts[0],
    });
  });

  it('creation: initial balance', async () => {
    const balance = await token.balanceOf(accounts[0]);
    assert.strictEqual(balance.toString(), totalSupply);
  });

  it('creation: inital name, symbol, decimals, totalSupply', async () => {
    const _name = await token.name.call();
    assert.strictEqual(_name, name);

    const _symbol = await token.symbol.call();
    assert.strictEqual(_symbol, symbol);

    const _decimals = await token.decimals.call();
    assert.strictEqual(_decimals.toString(), decimals.toString());

    const _totalSupply = await token.totalSupply.call();
    assert.strictEqual(_totalSupply.toString(), totalSupply.toString());
  });

  it('transfer: accounts[0] to accounts[1]', async () => {
    const beforeBalance = await token.balanceOf.call(accounts[0]);
    const amount = 1000;
    await token.transfer(accounts[1], amount, { from: accounts[0] });

    const afterBalance0 = await token.balanceOf.call(accounts[0]);
    const afterBalance1 = await token.balanceOf.call(accounts[1]);

    assert.strictEqual(beforeBalance.toString(), totalSupply);
    assert.strictEqual(
      afterBalance0.toString(),
      (totalSupply - 1000).toString(),
    );
    assert.strictEqual(afterBalance1.toString(), '1000');
  });

  it('should have zero allowance initially', async () => {
    const allowanceValue0 = await token.allowance.call(
      accounts[0],
      accounts[1],
    );
    assert.strictEqual(allowanceValue0.toString(), '0');
    const allowanceValue1 = await token.allowance.call(
      accounts[1],
      accounts[0],
    );
    assert.strictEqual(allowanceValue1.toString(), '0');
  });

  it('should have proper allowance after calling approve()', async () => {
    const val = 20;
    const approveResult = await token.approve(accounts[1], val, {
      from: accounts[0],
    });
    const allowanceVal = await token.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowanceVal.toString(), val.toString());
  });

  it('should be able to transfer proper amount on approve mapping', async () => {
    const account0BalanceInitial = await token.balanceOf(accounts[0]);
    const val = 20;
    const approveResult = await token.approve(accounts[1], val, {
      from: accounts[0],
    });
    console.log(approveResult.receipt);

    const allowanceVal = await token.allowance(accounts[0], accounts[1]);
    assert.strictEqual(allowanceVal.toString(), val.toString());

    await token.transferFrom(accounts[0], accounts[2], 20, {
      from: accounts[1],
    });

    const account0Balance = await token.balanceOf(accounts[0]);
    const account2Balance = await token.balanceOf(accounts[2]);

    assert.strictEqual(account2Balance.toString(), val.toString());
    assert.strictEqual(
      account0Balance.toString(),
      (account0BalanceInitial - val).toString(),
    );
  });

  it('should not be able to transferFrom when sender do not enough token', async () => {
    const val = 20;
    await token.balanceOf(accounts[0]);
    await token.approve(accounts[1], val, {
      from: accounts[0],
    });

    const allowanceVal = await token.allowance(accounts[0], accounts[1]);
    assert.strictEqual(allowanceVal.toString(), val.toString());
    await truffleAssert.fails(
      token.transferFrom(accounts[0], accounts[2], 21, {
        from: accounts[1],
      }),
    );

    // const account0Balance = await token.balanceOf(accounts[0]);
    // const account2Balance = await token.balanceOf(accounts[2]);

    // assert.strictEqual(account2Balance.toString(), val.toString());
    // assert.strictEqual(
    //   account0Balance.toString(),
    //   (account0BalanceInitial - val).toString(),
    // );
  });
});
