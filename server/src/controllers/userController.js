/* eslint-disable camelcase */
const { users, nfts, posts, images } = require('../models');
const { createAccount } = require('../chainUtils/accountUtils');
const { getEtherBalance, useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  getTokenBalance,
  transferTokenToUser,
  approveTokenToAdmin,
  spendApprovedToken,
} = require('../chainUtils/tokenUtils');

const WELCOMETOKEN = '10000000000000000';

module.exports = {
  getUserinfo: async (req, res) => {
    const { userId } = req.params;
    // console.log(userId);
    const userInfo = await users.findOne({
      where: { id: userId },
    });
    // console.log(userInfo);
    try {
      if (userInfo === null) {
        return res.status(400).send({ data: null, message: 'Invalid user' });
      }
      return res.status(200).json(userInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getBalance: async (req, res) => {
    const { userId } = req.params;
    const userInfo = await users.findOne({
      where: { id: userId },
    });
    try {
      if (userInfo === null) {
        return res.status(400).send({ data: null, message: 'Invalid user' });
      }
      const { eth, erc20 } = userInfo;
      return res.status(200).json({ eth, erc20 });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getNfts: async (req, res) => {
    const { userId } = req.params;
    const userNft = await nfts.findAll({
      where: { user_id: userId },
    });
    try {
      if (userNft === null) {
        return res
          .status(400)
          .send({ data: null, message: 'No minted nft or invalid user' });
      }
      return res.status(200).json(userNft);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getPostsByUserId: async (req, res) => {
    // 사진 관련해서 수정 필요
    // const imgUrlPrefix = `http://${req.headers.host}/images/`;
    // console.log(imgUrlPrefix);
    const { userId } = req.params;
    const userPosts = await posts.findAll({
      include: [
        {
          model: images,
        },
      ],
      where: { user_id: userId },
    });
    console.log(userPosts);
    try {
      if (userPosts === null) {
        return res
          .status(400)
          .send({ data: null, message: 'No updated posts or invalid user' });
      }
      return res.status(200).json({ data: userPosts });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  join: async (req, res, next) => {
    console.log(req.body);
    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      return res
        .status(400)
        .json({ message: 'input all required values', data: null });
    }
    // 1. check if account exists
    const joinedUser = await users.findOne({ where: { email } });
    if (joinedUser) {
      const joinedEmail = joinedUser.email;
      return res.status(403).json({
        message: `same email already exists : ${joinedEmail}`,
        data: null,
      });
    }
    // 5. if above processes are done update db.
    // 6. make above logics as ACID Transaction
    try {
      // 2. create new account
      // 3. verify created account
      const { address, privateKey } = await createAccount(); // web3 call
      const newUser = await users.create({
        email,
        password,
        wallet_account: address,
        eth: 0,
        login_provider: 'local',
        nickname,
        erc20: 0,
        wallet_pk: privateKey,
      });
      // 4. give initial ether and token, nft to account
      // 5. TODO: make web3 calls async and use eventListeners to update db when web3 transactions are done
      // NOW it is synchronized logic
      await useEtherFaucet(address);
      await transferTokenToUser(address, WELCOMETOKEN);
      // TODO: call transfer NFT to user here
      const tokenBalance = await getTokenBalance(address);
      const etherBalance = await getEtherBalance(address);
      console.log({ tokenBalance, etherBalance });
      await newUser.update({
        eth: etherBalance,
        erc20: tokenBalance,
      });
      return res.status(200).json(newUser);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  login: async (req, res, next) => {
    // 소셜로그인으로 인한 수정 필요
    const { email, password } = req.body;
    const login = await users.findOne({
      where: {
        email,
        password,
      },
    });
    try {
      if (login === null) {
        return res.status(400).send({ data: null, message: 'failed to login' });
      }
      return res.status(200).json(login);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};
