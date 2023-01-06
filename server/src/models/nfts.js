'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nfts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      nfts.belongsTo(models.users, { foreignKey: 'user_id', sourceKey: 'id' });
    }
  }
  nfts.init({
    contract_address: DataTypes.CHAR,
    token_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    listed: DataTypes.TINYINT,
    creator: DataTypes.CHAR,
    txhash: DataTypes.CHAR,
    metadata: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'nfts',
  });
  return nfts;
};