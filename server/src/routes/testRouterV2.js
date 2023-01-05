/* eslint-disable camelcase */
const express = require('express');
const userRouter = require('./userRouter');
const nftRouter = require('./nftRouter');
const postRouter = require('./postRouter');

const router = express.Router();

router.get('/doc', (req, res, next) => {
  res.redirect('https://www.notion.so/API-e96eb7f271044f279e9f398c815b63c3');
});

// user test api
router.route('/users', userRouter);

// nft test api
router.route('/nfts', nftRouter);

// post test api
router.route('/posts', postRouter);

module.exports = router;
