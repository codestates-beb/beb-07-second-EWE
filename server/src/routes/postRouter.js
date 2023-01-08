const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);

router.post('/', verifyToken, postController.createNewPost);
router.post('/del', postController.deletePosts);
router.post('/delimg', postController.deleteImgs);
router.put('/likes', postController.updateLikes);

module.exports = router;
