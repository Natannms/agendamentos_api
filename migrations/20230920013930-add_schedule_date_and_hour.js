'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Schedules', 'schedule_date', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Schedules', 'schedule_hour', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Schedules', 'schedule_date');
    await queryInterface.removeColumn('Schedules', 'schedule_hour');
  }
};
