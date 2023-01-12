const { users, nfts, sequelize } = require('../models');
const {
  getCurrentTokenId,
  approveAllNFTToAdmin,
  mintNFT,
} = require('../chainUtils/nftUtils');

const { approveTokenToAdmin } = require('../chainUtils/tokenUtils');

const { s3 } = require('../routes/multer');

module.exports = {
  getAllNfts: async (req, res) => {
    const { offset, limit } = req.query;
    try {
      if (!offset || !limit) {
        const allNfts = await nfts.findAll({});
        const nftCounts = await nfts.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'totalNum'],
          ],
        });
        return res.status(200).json({ nfts: allNfts, totalNum: nftCounts[0] });
      }
      const allNfts = await nfts.findAll({
        offset: Number(offset),
        limit: Number(limit),
      });
      const nftCounts = await nfts.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'totalNum']],
      });
      return res.status(200).json({ nfts: allNfts, totalNum: nftCounts[0] });
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

  mintNewNFT: async (req, res, next) => {
    try {
      // 1. 로그인 정보를 검증한다.
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

      // 2. 로그인된 정보를 바탕으로 nft를 민팅한다.
      const newTokenId = parseInt(await getCurrentTokenId(), 10) + 1; // tokenId 기준으로 이미지를 업로드 해야한다.
      // 2-1 nft는 admin에서 거래가능해야되므로 approve for all 도 호출해야한다.
      await approveTokenToAdmin(user.wallet_pk);
      await mintNFT(user.wallet_account); // mint는 항상 admin 계정에서 수행된 후 유저 계정으로 전송해준다
      approveAllNFTToAdmin(user.wallet_pk); // this can be asynchronous

      // 3. nft 민팅이 성공하면 body에 들어간 내용을 바탕으로 metadata json을 구성한다.
      const { name, description, attributes } = req.body;
      if (!name || !description || !attributes) {
        throw new Error('Must input all required values');
      }
      const objectName = `${newTokenId}.json`;
      const objectData = {
        name,
        description,
        attributes,
        image: req.file.location,
      };
      const objectType = 'application/json';
      const bucketName = 'ewe-metadata';
      // 4. metadata json을 tokenId에 맞게 S3에 업로드한다.
      const result = await s3
        .putObject({
          Bucket: bucketName,
          Key: objectName,
          Body: JSON.stringify(objectData),
          ContentType: objectType,
        })
        .promise();
      console.log('metadata to s3 upload result', result);

      return res.status(201).json({
        status: 'ok',
        message: 'new nft created',
        tokenId: newTokenId,
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  transferNFT: async (req, res) => {
    return res.status(200).json({ message: 'under construction' });
  },
};
