const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);
router.post('/', postController.createNewPost);
router.post('/del', postController.deletePosts);
router.post('/delimg', postController.deleteImgs);
router.post('/delimg', postController.deleteImgs);
router.put('/like', postController.updateLike);

module.exports = router;
