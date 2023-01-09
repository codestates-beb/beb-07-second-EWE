/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { users, nfts, posts, images } = require('../models');
const { createAccount } = require('../chainUtils/accountUtils');
const { getEtherBalance, useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  getTokenBalance,
  transferTokenToUser,
  approveTokenToAdmin,
  spendApprovedToken,
} = require('../chainUtils/tokenUtils');

const {
  getCurrentTokenId,
  giveWelcomeNFT,
  getNFTOwner,
  getMyNFTBalance,
} = require('../chainUtils/nftUtils');

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
          model: users,
          attributes: ['id', 'wallet_account', 'nickname'],
        },
        {
          model: images,
          attributes: ['uri'],
        },
      ],
      where: { user_id: userId },
    });
    // console.log(userPosts);

    try {
      if (userPosts === null) {
        return res
          .status(400)
          .send({ data: null, message: 'No updated posts or invalid user' });
      }
      return res.status(200).json(userPosts);
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
      await approveTokenToAdmin(address, WELCOMETOKEN);

      // if pre-minted nft exists, user gets free nft
      const targetNFT = await nfts.findOne({ where: { token_id: newUser.id } });
      if (targetNFT) {
        console.log('welcome nft presented to user!');
        await giveWelcomeNFT(address, newUser.id);
        await targetNFT.update({
          user_id: newUser.id,
        });
      }

      const tokenBalance = await getTokenBalance(address);
      const etherBalance = await getEtherBalance(address);

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
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ data: null, message: 'Invalid input' });
      }
      const user = await users.findOne({
        where: {
          email,
          password,
        },
      });
      if (!user) {
        return res.status(400).send({ data: null, message: 'failed to login' });
      }
      const { nickname } = user;
      const accessToken = jwt.sign(
        {
          email,
          nickname,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '60m',
          issuer: 'EWE api server',
        },
      );

      const refreshToken = jwt.sign(
        {
          email,
          nickname,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '60m',
          issuer: 'EWE api server',
        },
      );

      res.cookie('refreshToken', refreshToken, {
        sameSite: 'none',
        secure: true,
        maxAge: 90000,
        httpOnly: true,
      });
      return res
        .status(200)
        .json({ data: { accessToken, user }, message: 'accessToken issued' });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  my: async (req, res, next) => {
    try {
      if (!req.decoded) {
        const err = new Error(
          'Token is valid, but user info in token is invalid',
        );
        next(err);
      }
      const { email, nickname } = req.decoded;
      const user = await users.findOne({
        where: {
          email,
          nickname,
        },
      });
      if (!user) {
        return res.status(400).send({
          data: null,
          message:
            'no such user, but valid jwt token issued, try again or ask admin',
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
