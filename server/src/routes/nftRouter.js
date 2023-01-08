const express = require('express');

const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken');
const { nftUpload } = require('./multer');
const nftController = require('../controllers/nftController');

router.get('/', nftController.getAllNfts);
router.post(
  '/',
  verifyToken,
  nftUpload.single('image'),
  nftController.mintNewNFT,
);

router.get('/:nftId', nftController.getNftByTokenId);
router.post('/:nftId/transfer', verifyToken, nftController.transferNFT);

module.exports = router;
