"use strict";

let data = require("../web-scrap/scraped-data/sub-catagory/food.json");
const request = require("request");
const fs = require("fs");

async function download(url, dest) {
    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
        request({
                /* Here you should specify the exact link to the file you are trying to download */
                uri: url,
                gzip: true,
            })
            .pipe(file)
            .on("finish", async() => {
                console.log(`The file is finished downloading.`);
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    }).catch((error) => {
        console.log(`Something happened: ${error}`);
    });
}

// example

(async() => {
    var fs = require("fs");
    var dir = "./web-scrap/sakil";

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const url = "https://chaldn.com/_mpimage/sis-white-sugar-2-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D48010&q=low&v=1&m=400&webp=1"
    const imageUrlSplit = url.split('?')[0];
    const secondSplit = imageUrlSplit.split('/');
    const imageName = secondSplit[secondSplit.length - 1]
    const data = await download(
        url,
        `${dir}/${imageName}` + ".png"
    );
    console.log(data); // The file is finished downloading.
})();
//image donwload portion ends

let item = [

];
// for (let dt of data) {
let shit = async(data) => {
    var fs = require("fs");
    var dir = "./web-scrap/sakil";

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    for (let dt of data) {
        const url = dt.image;
        const imageUrlSplit = url.split("?")[0];
        const secondSplit = imageUrlSplit.split("/");
        const imageName = secondSplit[secondSplit.length - 1];
        const data = await download(url, `${dir}/${imageName}` + ".png");
    }
    console.log(data); // The file is finished downloading.
};
shit(data);

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