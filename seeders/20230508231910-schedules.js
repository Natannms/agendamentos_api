"use strict";

// import a faker lib
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
      "Schedules",
      [
        {
          userId: 1,
          descriptionService:'xyz',
          price:50,
          status:'Agendamento Solicitado',
          paymentStatus:'Pending',
          schedule_date: new Date(),
          schedule_hour: '12:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          descriptionService:'xyz',
          price:50,
          status:'Agendamento Confirmado',
          paymentStatus:'Pending',
          schedule_date: new Date(),
          schedule_hour: '12:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          descriptionService:'xyz',
          price:50,
          status:'Concluído',
          paymentStatus:'Pending',
          schedule_date: new Date(),
          schedule_hour: '12:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          descriptionService:'xyz',
          price:50,
          status:'Concluído',
          paymentStatus:'Concluded',
          schedule_date: new Date(),
          schedule_hour: '12:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          descriptionService:'xyz',
          price:50,
          status:'Canceled',
          paymentStatus:'Closed',
          schedule_date: new Date(),
          schedule_hour: '12:00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
     await queryInterface.bulkDelete('Schedules', null, {});
  },
};
