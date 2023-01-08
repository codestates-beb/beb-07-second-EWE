const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllposts);
router.get('/:postId', postController.getPostsByPostId);

router.post('/', postController.createNewPost);
<<<<<<< Updated upstream
router.post('/del', postController.deletePosts);
router.post('/delimg', postController.deleteImgs);
router.put('/likes', postController.updateLikes);
=======
router.post('/:postId/del', postController.deletePosts);
router.post('/:postId/delimg', postController.deleteImgs);
router.post('/:postId/delimg', postController.deleteImgs);

router.put('/:postId/likes', postController.updateLikes);
>>>>>>> Stashed changes
router.put('/views', postController.updateViews);

module.exports = router;
