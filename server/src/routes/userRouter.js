const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId', userController.getUserinfo);
router.get('/:userId/balance', userController.getBalance);
router.get('/:userId/nfts', userController.getNfts);
router.get('/:userId/posts', userController.getPosts);

router.post('/join', userController.join);
router.post('/login', userController.login);

module.exports = router;
