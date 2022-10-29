const request = require("request");
const fs = require("fs");
let data = require("./scraped-data/sub_catagory.json");

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
    var dir = "./public/uploads";

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let sub_catagory_to_db_insert = [];

    data.forEach((ul) => {
        const url = ul.image;
        const imageUrlSplit = url.split("?")[0];
        const secondSplit = imageUrlSplit.split("/");
        const imageName = secondSplit[secondSplit.length - 1];
        const data = download(url, `${dir}/${imageName}` + ".png");

        const obj = { title: ul.title, image: imageName + '.png' };
        sub_catagory_to_db_insert.push(obj);
    });

    //to save updated json with downloaded image link 

    const tempSeedDirectory = "./web-scrap/data-to-seed"

    fs.writeFile(`${tempSeedDirectory}/sub-catagory-to-seed.json`, JSON.stringify(sub_catagory_to_db_insert), (err) => {
        if (err) throw err;
        console.log(`Data written to file to ${tempSeedDirectory}/sub-catagory-to-seed.json`);
    });
    // The file is finished downloading.
})();