"use strict";
require('dotenv').config();

let data = require("../web-scrap/data-to-seed/sub-catagory-to-seed.json");


const item = [

];
// for (let dt of data) {

data.forEach(data => {
    item.push({
        sub_catagory_id: 1,
        child_catagory_title: data.title,
        image: data.image,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
})

// }

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("child_catagories", item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("child_catagories", null, {});
    },
};