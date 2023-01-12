const express = require('express');

const router = express.Router();

const { ADMIN_ADDRESS } = process.env;

const { getEtherBalance, useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  getTokenBalance,
  transferTokenToUser,
} = require('../chainUtils/tokenUtils');
const { createAccount } = require('../chainUtils/accountUtils');

router.get('/admin/token/balance', async (req, res) => {
  const tokenBalance = await getTokenBalance(ADMIN_ADDRESS);
  return res.json(tokenBalance);
});

router.get('/admin/ether/balance', async (req, res) => {
  const etherBalance = await getEtherBalance(ADMIN_ADDRESS);
  return res.json(etherBalance);
});

router.get('/:address/token/balance', async (req, res) => {
  const { address } = req.params;
  const tokenBalance = await getTokenBalance(address);
  return res.json(tokenBalance);
});

router.get('/:address/token/reward', async (req, res) => {
  const { address } = req.params;
  let tokenBalance = await getTokenBalance(address);
  console.log('before', tokenBalance);
  await transferTokenToUser(address, '10000000000000000');
  tokenBalance = await getTokenBalance(address);
  console.log('after', tokenBalance);
  return res.json({ address, tokenBalance });
});

router.get('/:address/ether/balance', async (req, res, next) => {
  try {
    const { address } = req.params;
    const etherBalance = await getEtherBalance(address);
    return res.json(etherBalance);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get('/:address/ether/faucet', async (req, res, next) => {
  try {
    const { address } = req.params;
    const beforeetherBalance = await getEtherBalance(address);
    const result = await useEtherFaucet(address);
    const afteretherBalance = await getEtherBalance(address);
    return res.json(result, beforeetherBalance, afteretherBalance);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get('/createAccount', async (req, res) => {
  const newAccount = await createAccount();
  return res.json(newAccount);
});
module.exports = router;
