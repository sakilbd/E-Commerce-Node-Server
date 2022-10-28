"use strict";
let data = require("../web-scrap/scraped-data/sub-catagory/food.json");
let download = require("../web-scrap/image-download.js")

download.downloadImage();
let item = [];
for (let dt of data) {
    item.push({
        root_catagory_id: 1,
        sub_catagory_title: dt.title,
        image: dt.image,

        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("sub_catagories", item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("sub_catagories", null, {});
    },
};