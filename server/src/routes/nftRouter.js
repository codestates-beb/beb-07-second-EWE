const express = require('express');

const router = express.Router();
const nftController = require('../controllers/nftController');

router.get('/', nftController.getAllNfts);
router.get('/:nftId', nftController.getNftByTokenId);

module.exports = router;
