'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.STRING
            },
            unitAmount: {
                type: Sequelize.STRING
            },
            unit: {
                type: Sequelize.STRING
            },
            rating: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('products');
    }
};