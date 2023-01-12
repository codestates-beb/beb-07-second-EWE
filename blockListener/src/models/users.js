'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.nfts, { foreignKey: 'user_id', sourceKey: 'id' });
      users.hasMany(models.posts, { foreignKey: 'user_id', sourceKey: 'id' });
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    wallet_account: DataTypes.CHAR,
    eth: DataTypes.STRING,
    login_provider: DataTypes.ENUM('local', 'naver', 'google', 'kakao'),
    nickname: DataTypes.STRING,
    erc20: DataTypes.STRING,
    wallet_pk: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};