"use strict";

let data = require("../web-scrap/scraped-data/sub-catagory/food.json");


const item = [

];
// for (let dt of data) {


item.push({
    root_catagory_id: 1,
    sub_catagory_title: "sdfsdf",
    image: "sdfsd",

    createdAt: new Date(),
    updatedAt: new Date(),
});
// }

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("sub_catagories", item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("sub_catagories", null, {});
    },
};