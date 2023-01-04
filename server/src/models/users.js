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
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    wallet_account: DataTypes.CHAR,
    eth: DataTypes.INTEGER,
    login_provider: DataTypes.ENUM,
    nickname: DataTypes.STRING,
    erc20: DataTypes.INTEGER,
    wallet_pk: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};