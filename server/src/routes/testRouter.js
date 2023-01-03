/* eslint-disable camelcase */
const express = require('express');
const { users, posts, nfts } = require('../dummyData');

const router = express.Router();

router.get('/doc', (req, res, next) => {
  res.redirect('https://www.notion.so/API-e96eb7f271044f279e9f398c815b63c3');
});

// user test api
router.get('/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { id, nickname, email, eth, erc20, wallet_account } = users[userId - 1];
  res.status(200).json({ id, email, nickname, wallet_account, eth, erc20 });
});

router.get('/users/:userId/balance', (req, res, next) => {
  const { userId } = req.params;
  const { eth, erc20 } = users[userId - 1];
  return res.status(200).json({ eth, erc20 });
});

router.get('/users/:userId/nfts', (req, res, next) => {
  const { userId } = req.params;
  const result = nfts.filter((elem) => elem.owner.toString() === userId);
  return res.status(200).json(result);
});

router.get('/users/:userId/posts', (req, res, next) => {
  const imgUrlPrefix = `http://${req.headers.host}/images/`;
  const { userId } = req.params;
  const result = posts
    .filter((elem) => elem.creator.toString() === userId)
    .map((elem) => {
      if (elem.images[0].length === 5) {
        elem.images[0] = imgUrlPrefix + elem.images[0];
      }
      return elem;
    });
  return res.status(200).json(result);
});
router.post('/users/join', (req, res, next) => {
  return res.status(200).json('POST test/user/join not implemented');
});
router.post('/users/login', (req, res, next) => {
  return res.status(200).json('POST test/user/login not implemented');
});

// nft test api
router.get('/nfts', (req, res, next) => {
  return res.status(200).json(nfts);
});
router.get('/nfts/:nftId', (req, res, next) => {
  const { nftId } = req.params;
  return res.status(200).json(nfts[nftId - 1]);
});
router.post('/nfts/mint', (req, res, next) => {
  return res.status(200).json('POST test/nft/mint not implemented yet');
});

// post test api
router.get('/posts', (req, res, next) => {
  const imgUrlPrefix = `http://${req.headers.host}/images/`;
  const result = posts.map((elem) => {
    if (elem.images[0].length === 5) {
      elem.images[0] = imgUrlPrefix + elem.images[0];
    }
    return elem;
  });
  return res.status(200).json({ result });
});
router.get('/posts/:postId', (req, res, next) => {
  const imgUrlPrefix = `http://${req.headers.host}/images/`;
  const { postId } = req.params;
  const result = posts[postId - 1];
  if (result.images[0].length === 5) {
    result.images[0] = imgUrlPrefix + result.images[0];
  }
  return res.status(200).json(result);
});
module.exports = router;
