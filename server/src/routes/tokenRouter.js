const express = require('express');

const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken');
const tokenController = require('../controllers/tokenController');

router.post('/transfer', verifyToken, tokenController.transferToken);

module.exports = router;
