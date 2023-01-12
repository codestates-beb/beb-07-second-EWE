const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/join', userController.join);
router.post('/login', userController.login);

router.get('/logout', userController.logout);
router.get('/my', verifyToken, userController.my);
router.get('/newAccessToken', userController.newAccessToken);

router.get('/:userId', userController.getUserinfo);
router.get('/:userId/balance', userController.getBalance);
router.get('/:userId/nfts', userController.getNfts);
router.get('/:userId/posts', userController.getPostsByUserId);
router.put('/:userId/updateuser', verifyToken, userController.updateUserinfo);

module.exports = router;
