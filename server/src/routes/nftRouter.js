const express = require('express');

const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken');
const nftController = require('../controllers/nftController');

router.get('/', nftController.getAllNfts);
router.post('/', verifyToken, nftController.mintNewNFT);

router.get('/:nftId', nftController.getNftByTokenId);
router.post('/:nftId/transfer', verifyToken, nftController.transferNFT);

module.exports = router;
