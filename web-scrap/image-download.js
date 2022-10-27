const request = require('request');
const fs = require('fs');

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
                .on('finish', async() => {
                    console.log(`The file is finished downloading.`);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        })
        .catch((error) => {
            console.log(`Something happened: ${error}`);
        });
}

// example

(async() => {
    const data = await download('https://chaldn.com/_mpimage/sis-white-sugar-2-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D48010&q=low&v=1&m=400&webp=1', './web-scrap/images/image.jpg');
    console.log(data); // The file is finished downloading.
})();