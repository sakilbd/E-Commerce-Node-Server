const axios = require("axios");

const cheerio = require("cheerio");
const fs = require("fs");
var jsonFileName;
const getPostTitles = async() => {
    try {
        let url = "https://chaldal.com/cleaning"
        let urlSplit = url.split('/');
        jsonFileName = urlSplit[urlSplit.length - 1];
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const postTitles = [];
        // return "shauwa"
        // return $('div > p.web-header-address > span.web-header-address-title').text();
        $("a.category > div ").each((_idx, el) => {
            // console.log(el)
            // const postTitle = $(el).text();
            // const image = $(el).attr().src;
            const postTitle = $(el).find(".name").text();
            const image = $(el).find("img").attr().src;
            let obj = {
                title: postTitle,
                image: image,
            };
            postTitles.push(obj);
        });

        return postTitles;
    } catch (error) {
        throw error;
    }
};

getPostTitles().then((postTitles) => {
    fs.writeFile(`./web-scrap/cheerio/sub-catagory/${jsonFileName}.json`, JSON.stringify(postTitles), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    console.log(postTitles);
});