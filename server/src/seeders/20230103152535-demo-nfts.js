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
    await queryInterface.bulkInsert('nfts', [
      {
        token_id: 1,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 1,
        listed: false,
        price: null,
        txhash: '0x250c4a4ccfc4d1fe9d6a3179fad8155a5be5e53d704ee2675e9e177b43e5d41d',
        creator: '0xDC9930f081f5cB5C9DA39EA5aDbcA5dfC42F1d3f',
      },
      {
        token_id: 2,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 2,
        listed: false,
        price: null,
        txhash: '0xb62949d5ce1e4100f31337108e40b628735c7eb6847a77e75522e95dd19aa9ff',
        creator: '0x69783C1b7689FeA1ba79186Ff441E8dA421f22a9',
      },
      {
        token_id: 3,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 3,
        listed: true,
        price: 20,
        txhash: '0xc14578c7baa6929a512e8d6d8f5ed3f99912e4d44791dd82c4c48d86c608e5e6',
        creator: '0xDC9930f081f5cB5C9DA39EA5aDbcA5dfC42F1d3f',
      },
      {
        token_id: 4,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 4,
        listed: false,
        price: null,
        txhash: '0xd00a8d7d8592c0fd7b403debdb109721707de4118c6259e08367fd2543125592',
        creator: '0x02df6C85D3644d4C478CC167Ea4e890D88a0e2d6',
      },
      {
        token_id: 5,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 1,
        listed: true,
        price: 30,
        txhash: '0x29dfe3289624878871706437fd88da2b703e4b18ba7d9d6c815942412619b3c9',
        creator: '0x4E11450Eae875A22b1734B00d9F0F8483020D7EB',
      },
      {
        token_id: 6,
        contract_address: '0x6dccb371189ed45cc938301c82dbf55147510fa2',
        user_id: 4,
        listed: true,
        price: 100,
        txhash: '0x9eb78d72ba84824241e84b4dfdc40fe7021ae4410be811685674e7e6350731b1',
        creator: '0x4E11450Eae875A22b1734B00d9F0F8483020D7EB',
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
    await queryInterface.bulkDelete('nfts', null, {});
  }
};
