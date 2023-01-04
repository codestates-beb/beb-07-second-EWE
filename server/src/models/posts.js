'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.hasMany(models.images, { foreignKey: 'post_id', sourceKey: 'id' });
    }
  }
  posts.init({
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    content: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};