/* eslint-disable camelcase */
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

  createNewPost: async (req, res) => {
    console.log(req.body);
    const { user_id, title, location, store_name, content, uri } = req.body;
    if (!user_id || !title || !location || !store_name || !content || !uri) {
      return res
        .status(400)
        .json({ message: 'input all required values', data: null });
    }
    try {
      const newPost = await posts.create({
        title,
        location,
        store_name,
        content,
        views: 0,
        likes: 0,
        user_id,
      });
      console.log(newPost);
      const newImg = await images.create({
        uri,
        post_id: newPost.id,
      });
      console.log(newImg);
      return res.status(200).send({ posts: newPost, images: newImg });
    } catch (err) {
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  deletePosts: async (req, res) => {
    // 수정 필요
    const { id } = req.body;
    const ifexist = await posts.findOne({
      where: { id },
    });
    try {
      if (!ifexist) {
        return res
          .status(400)
          .send({ data: null, message: 'no according posts' });
      }
      const deletePost = await posts.destroy({
        where: { id },
      });
      const deleteImg = await images.destroy({
        where: { post_id: id },
      });
      console.log(deletePost);
      console.log(deleteImg);
      return res.status(200).send({ message: 'successfully deleted!' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  deleteImgs: async (req, res) => {
    const { id } = req.body;
    const ifexist = await images.findOne({
      where: { id },
    });
    try {
      if (!ifexist) {
        return res
          .status(400)
          .send({ data: null, message: 'no according posts' });
      }
      const deleteImg = await images.destroy({
        where: { id },
      });
      console.log(deleteImg);
      return res.status(200).send({ message: 'successfully deleted!' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },

  updateLike: async (req, res) => {
    const { id } = req.body;
    try {
      if (id === null) {
        return res
          .status(400)
          .send({ data: null, message: 'no according posts' });
      }
      const plusLike = await posts.update(
        {
          likes: 1,
        },
        {
          where: { id },
        },
      );
      return res.status(200).json(plusLike);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ data: null, message: 'server error' });
    }
  },
};
