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
        uri: 'http://20.214.190.113:5050/images/6.jpg',
        post_id: 6,
      },
      {
        uri: 'http://20.214.190.113:5050/images/7.jpg',
        post_id: 7,
      },
      {
        uri: 'http://20.214.190.113:5050/images/8.jpg',
        post_id: 8,
      },
      {
        uri: 'http://20.214.190.113:5050/images/9.jpg',
        post_id: 9,
      },
      {
        uri: 'http://20.214.190.113:5050/images/10.jpg',
        post_id: 10,
      },
      {
        uri: 'http://20.214.190.113:5050/images/11.jpg',
        post_id: 11,
      },
      {
        uri: 'http://20.214.190.113:5050/images/12.jpg',
        post_id: 12,
      },
      {
        uri: 'http://20.214.190.113:5050/images/13.jpg',
        post_id: 13,
      },
      {
        uri: 'http://20.214.190.113:5050/images/14.jpg',
        post_id: 14,
      },
      {
        uri: 'http://20.214.190.113:5050/images/15.jpg',
        post_id: 15,
      },
      {
        uri: 'http://20.214.190.113:5050/images/16.jpg',
        post_id: 16,
      },
      {
        uri: 'http://20.214.190.113:5050/images/17.jpg',
        post_id: 17,
      },
      {
        uri: 'http://20.214.190.113:5050/images/18.jpg',
        post_id: 18,
      },
      {
        uri: 'http://20.214.190.113:5050/images/19.jpg',
        post_id: 19,
      },
      {
        uri: 'http://20.214.190.113:5050/images/20.jpg',
        post_id: 20,
      },
      {
        uri: 'http://20.214.190.113:5050/images/21.jpg',
        post_id: 1,
      },
    ]);
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
