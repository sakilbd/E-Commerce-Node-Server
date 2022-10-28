const request = require("request");
const fs = require("fs");
let data = require("./scraped-data/sub-catagory/food.json");


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
    data.forEach(async ul => {
            const url = ul.image
            const imageUrlSplit = url.split('?')[0];
            const secondSplit = imageUrlSplit.split('/');
            const imageName = secondSplit[secondSplit.length - 1]
            const data = await download(
                url,
                `${dir}/${imageName}` + ".png"
            );
            console.log(data);


        })
        // The file is finished downloading.
})();