/* eslint-disable camelcase */
const { users, nfts, posts, images } = require('../models');

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

  join: async (req, res) => {
    console.log(req.body);
    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      return res
        .status(400)
        .json({ message: 'input all required values', data: null });
    }
    // call web3 to create account info
    try {
      const result = await users.create({
        email,
        password,
        wallet_account,
        eth: 0,
        login_provider,
        nickname,
        erc20: 0,
        wallet_pk,
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  login: async (req, res) => {
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
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },
};
