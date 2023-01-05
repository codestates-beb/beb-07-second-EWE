const { users, nfts, posts, images } = require('../models');

module.exports = {
  getAllNfts: async (req, res) => {
    try {
      const allNfts = await nfts.findAll({});
      return res.status(200).json(allNfts);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getNftByTokenId: async (req, res) => {
    // token_id or id or user_id 정해야 한다!
    const { nftId } = req.params;
    const nft = await nfts.findOne({
      where: { token_id: nftId },
    });
    try {
      if (nft === null) {
        return res.status(400).send({ data: null, message: 'no such NFT' });
      }
      return res.status(200).json(nft);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },
};
