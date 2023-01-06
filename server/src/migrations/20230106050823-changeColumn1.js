'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('users', 'eth', {
      type: DataTypes.STRING,
    });
    await queryInterface.changeColumn('users', 'erc20', {
      type: DataTypes.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('users', 'eth', {
      type: DataTypes.INTEGER,
    });
    await queryInterface.changeColumn('users', 'erc20', {
      type: DataTypes.INTEGER,
    });
  },
};
