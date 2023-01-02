const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controller');

router.post('/join', controller.user_join_post);
router.post('/login', controller.user_login_post);
router.post('/transfer', controller.user_transfer_post);

module.exports = router;
