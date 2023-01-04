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
    await queryInterface.bulkInsert('users', [
      {
        nickname: 'seol',
        email: 'donghun@naver.com',
        wallet_account: '0xDC9930f081f5cB5C9DA39EA5aDbcA5dfC42F1d3f',
        eth: 100,
        erc20: 300,
        password: '1234',
        login_provider: 'local',
        wallet_pk: '087839a8b4ddfd1afef8f2d4125fd69004f5277b91c459f313ffee03017284a5',
      },
      {
        nickname: 'kim',
        email: 'hyuntae@naver.com',
        wallet_account: '0x69783C1b7689FeA1ba79186Ff441E8dA421f22a9',
        eth: 500,
        erc20: 400,
        password: '56789',
        login_provider: 'naver',
        wallet_pk: '5e68d12cdaf81395a7aed0c463b6624f14a998ab3f4a841c7cf8360b85f50bfe',
      },
      {
        nickname: 'yoon',
        email: 'soobin@naver.com',
        wallet_account: '0x02df6C85D3644d4C478CC167Ea4e890D88a0e2d6',
        eth: 200,
        erc20: 100,
        password: 'abcd',
        login_provider: 'local',
        wallet_pk: '1b574e6b4b65a0be8d7bb46065e056badba00694a6aa277c0cf5f2fd35346d52',
      },
      {
        nickname: 'kang',
        email: 'duhoon@naver.com',
        wallet_account: '0x4E11450Eae875A22b1734B00d9F0F8483020D7EB',
        eth: 800,
        erc20: 300,
        password: '1234',
        login_provider: 'google',
        wallet_pk: 'e565657aafad921d64bfab3e86815aa933dffcd3f0eb6737e4c5dd1b0d124180',
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
    await queryInterface.bulkDelete('users', null, {});
  }
};
