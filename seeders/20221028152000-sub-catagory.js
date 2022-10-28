'use strict';
let data = require('../web-scrap/scraped-data/sub-catagory/food.json');

let item = [];
for (let i = 0; i < data.length; i++) {
    item.push({
        sub_catagory_title: 'John' + i,
        image: 'Doe' + i,

        createdAt: new Date(),
        updatedAt: new Date()
    });
}


module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('sub_catagories', item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('sub_catagories', null, {});
    }
};