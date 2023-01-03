'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('images', [
      {
        uri: '1.jpg',
        post_id: 1,
      },
      {
        uri: '2.jpg',
        post_id: 2,
      },
      {
        uri: '3.jpg',
        post_id: 3,
      },
      {
        uri: '4.jpg',
        post_id: 4,
      },
      {
        uri: '5.jpg',
        post_id: 5,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('images', null, {});
  }
};
