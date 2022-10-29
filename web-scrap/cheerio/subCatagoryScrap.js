const axios = require("axios");

const cheerio = require("cheerio");
const fs = require("fs");
var jsonFileName;
const getPostTitles = async() => {
    try {
        let url = "https://chaldal.com/food"
        let urlSplit = url.split('/');
        jsonFileName = urlSplit[urlSplit.length - 1];
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const sub_catagories = [];
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
            sub_catagories.push(obj);
        });

        return sub_catagories;
    } catch (error) {
        throw error;
    }
};

getPostTitles().then((sub_catagories) => {
    const directoryToKeePAllScraps = "./web-scrap/scraped-data/sub-catagory";
    const tempDirectory = "./web-scrap/scraped-data";
    fs.writeFile(`${directoryToKeePAllScraps}/${jsonFileName}.json`, JSON.stringify(sub_catagories), (err) => {
        if (err) throw err;
        console.log(`Data written to file to ${directoryToKeePAllScraps}/${jsonFileName}.json`);
    });
    fs.writeFile(`${tempDirectory}/sub_catagory.json`, JSON.stringify(sub_catagories), (err) => {
        if (err) throw err;
        console.log(`Data written to file to ${tempDirectory}/sub_catagory.json`);
    });
    console.log(sub_catagories);
});