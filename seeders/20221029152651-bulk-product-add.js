"use strict";
require('dotenv').config();

let data = require("../web-scrap/data-to-seed/products-to-seed.json");


const item = [

];
// for (let dt of data) {

data.forEach(data => {



    item.push({
        child_catagory_id: process.env.CHILD_CATAGORY_ID,
        product_title: data.title,
        image: data.image,
        quantity: data.quantity,
        discounted_price: (data.discounted_price).split(',').join(''),
        price: (data.price).split(',').join(''),
        rating: ((Math.random() * (5 - 3)) + 3).toFixed(2),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
})

// }

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("products", item);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("products", null, {});
    },
};