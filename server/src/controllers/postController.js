const { users, nfts, posts, images } = require('../models');

module.exports = {
  getAllposts: async (req, res) => {
    try {
      const allPosts = await posts.findAll({
        include: [
          {
            model: images,
          },
        ],
      });
      return res.status(200).json(allPosts);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  getPostsByPostId: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await posts.findAll({
        include: [
          {
            model: images,
          },
        ],
        where: { id: postId },
      });
      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },
};
