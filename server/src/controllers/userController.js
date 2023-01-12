/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { users, nfts, posts, images, sequelize } = require('../models');
const { createAccount } = require('../chainUtils/accountUtils');
const { useEtherFaucet } = require('../chainUtils/etherUtils');
const {
  transferTokenToUser,
  approveTokenToAdmin,
} = require('../chainUtils/tokenUtils');

const { giveWelcomeNFT } = require('../chainUtils/nftUtils');

const { WELCOMETOKEN } = process.env;

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
    const { offset, limit } = req.query;
    try {
      // without query params
      if (!offset || !limit) {
        const userNft = await nfts.findAll({
          where: { user_id: userId },
        });
        if (userNft === null) {
          return res
            .status(400)
            .send({ data: null, message: 'No minted nft or invalid user' });
        }
        const userNftCounts = await nfts.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'totalNum'],
          ],
          where: { user_id: userId },
        });
        return res.status(200).json({ nfts: userNft, totalNum: userNftCounts });
      }
      // with query params
      const userNft = await nfts.findAll({
        where: { user_id: userId },
        offset: Number(offset),
        limit: Number(limit),
      });
      if (userNft === null) {
        return res
          .status(400)
          .send({ data: null, message: 'No minted nft or invalid user' });
      }
      const userNftCounts = await nfts.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'totalNum']],
        where: { user_id: userId },
      });
      return res.status(200).json({ nfts: userNft, totalNum: userNftCounts });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getPostsByUserId: async (req, res) => {
    const { userId } = req.params;
    const { offset, limit } = req.query;
    try {
      // without query params
      if (!offset || !limit) {
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
        if (userPosts === null) {
          return res
            .status(400)
            .send({ data: null, message: 'No updated posts or invalid user' });
        }
        const userPostCounts = await posts.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'totalNum'],
          ],
          where: { user_id: userId },
        });
        return res
          .status(200)
          .json({ posts: userPosts, totalNum: userPostCounts[0] });
      }
      // with query params
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
        offset: Number(offset),
        limit: Number(limit),
      });
      if (userPosts === null) {
        return res
          .status(400)
          .send({ data: null, message: 'No updated posts or invalid user' });
      }
      const userPostCounts = await posts.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'totalNum']],
        where: { user_id: userId },
      });
      return res
        .status(200)
        .json({ posts: userPosts, totalNum: userPostCounts[0] });
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
        giveWelcomeNFT(address, newUser.id);
      }
      // below feature migrated to block listener
      // const tokenBalance = await getTokenBalance(address);
      // const etherBalance = await getEtherBalance(address);

      // await newUser.update({
      //   eth: etherBalance,
      //   erc20: tokenBalance,
      // });
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
          expiresIn: '30m',
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
      console.log({ refreshToken });
      res.cookie('refreshToken', refreshToken, {
        // domain: '.localhost:3000',
        sameSite: 'none',
        secure: true,
        maxAge: 60 * 60 * 1000,
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

  logout: async (req, res, next) => {
    try {
      if (!req.cookies.refreshToken) {
        return res
          .status(200)
          .json({ message: 'no refresh token provied', status: 'ok' });
      }

      res.clearCookie('refreshToken', {
        sameSite: 'none',
        secure: true,
        maxAge: 1,
        httpOnly: true,
      });

      return res.status(200).json({
        message: 'refresh Token now removed from cookie',
        status: 'ok',
      });
    } catch (err) {
      console.error(err);
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

  newAccessToken: async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(404)
        .json({ data: null, message: 'no refresh token in cookie' });
    }

    try {
      const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const { email, nickname } = refreshTokenData;
      if (!email || !nickname) {
        return res
          .status(400)
          .json({ data: null, message: 'Invalid refresh token' });
      }
      const user = await users.findOne({
        where: {
          email,
          nickname,
        },
      });
      if (!user) {
        return res.status(400).send({ data: null, message: 'failed to login' });
      }
      const accessToken = jwt.sign(
        {
          email,
          nickname,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30m',
          issuer: 'EWE api server',
        },
      );
      return res
        .status(200)
        .json({ data: { accessToken, user }, message: 'accessToken issued' });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  updateUserinfo: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const currentUserinfo = await users.findOne({ where: { id: userId } });
      if (currentUserinfo.login_provider === 'local') {
        let { password, nickname } = req.body;
        if (!password) password = currentUserinfo.password;
        if (!nickname) nickname = currentUserinfo.nickname;
        await users.update({ password, nickname }, { where: { id: userId } });
        const updatedUserinfo = await users.findOne({ where: { id: userId } });
        return res.status(200).json(updatedUserinfo);
      }
      if (currentUserinfo.login_provider === 'naver') {
        let { nickname } = req.body;
        if (!nickname) nickname = currentUserinfo.nickname;
        await users.update({ nickname }, { where: { id: userId } });
        const updatedUserinfo = await users.findOne({ where: { id: userId } });
        return res.status(200).json(updatedUserinfo);
      }
      return res.status(400).send({ message: 'invalid user' });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};
