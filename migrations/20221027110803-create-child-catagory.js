'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Child_Catagories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: "sub_catagories",
                    key: "id"
                },
            },
            sub_catagory_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "sub_catagories",
                    key: "id"
                },
            },
            child_catagory_title: {
                type: Sequelize.STRING
            },
            image: {
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
        await queryInterface.dropTable('Child_Catagories');
    }
};