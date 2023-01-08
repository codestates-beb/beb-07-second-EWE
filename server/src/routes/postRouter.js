const express = require('express');

const router = express.Router();
const upload = require('./multer');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);
router.post('/', upload.single('image'), postController.createNewPost);
router.post('/:postId/delpost', postController.deletePosts);
router.post('/:postId/delimg', postController.deleteImgs);
router.put('/:postId/likes', postController.updateLikes);

module.exports = router;
