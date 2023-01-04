'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      wallet_account: {
        type: Sequelize.CHAR
      },
      eth: {
        type: Sequelize.INTEGER
      },
      login_provider: {
        type: Sequelize.ENUM('local', 'naver', 'google', 'kakao')
      },
      nickname: {
        type: Sequelize.STRING
      },
      erc20: {
        type: Sequelize.INTEGER
      },
      wallet_pk: {
        type: Sequelize.CHAR
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};