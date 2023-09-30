'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Addresses",
      [
        {
          userId: 1,
          rua:"rua tal",
          numero: 4,
          bairro: 'xyx de x',
          cidade: "xyz city",
          estado: "State Xyz",
          cep: 31872050,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          rua:"rua tal",
          numero: 4,
          bairro: 'xyx de x',
          cidade: "xyz city",
          estado: "State Xyz",
          cep: 31872050,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          rua:"rua tal",
          numero: 4,
          bairro: 'xyx de x',
          cidade: "xyz city",
          estado: "State Xyz",
          cep: 31872050,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
