const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);

module.exports = router;
