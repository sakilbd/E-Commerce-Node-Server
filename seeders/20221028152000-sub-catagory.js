"use strict";

let data = require("../web-scrap/data-to-seed/sub-catagory-to-seed.json");


const item = [

];
// for (let dt of data) {

data.forEach(data => {
    item.push({
        root_catagory_id: 1,
        sub_catagory_title: data.title,
        image: data.image,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
})

// }

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("sub_catagories", item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("sub_catagories", null, {});
    },
};