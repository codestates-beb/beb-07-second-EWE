const express = require('express');

const router = express.Router();
const upload = require('./multer');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);
<<<<<<< HEAD

router.post('/', verifyToken, postController.createNewPost);
router.post('/del', postController.deletePosts);
router.post('/delimg', postController.deleteImgs);
router.put('/likes', postController.updateLikes);
=======
router.post('/', upload.single('image'), postController.createNewPost);
router.post('/:postId/delpost', postController.deletePosts);
router.post('/:postId/delimg', postController.deleteImgs);
router.put('/:postId/likes', postController.updateLikes);
>>>>>>> ab0f51ca2b50a37f665b746f378f9f2b789a1d07

module.exports = router;
