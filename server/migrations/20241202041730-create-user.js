'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('(UUID())'),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['student', 'admin'],
        allowNull: false,
        defaultValue: 'student'
      },
      faculty: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recievedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      chargedPages: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      freePagesPerYear: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};