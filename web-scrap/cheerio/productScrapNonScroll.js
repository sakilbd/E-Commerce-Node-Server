const axios = require("axios");

const cheerio = require("cheerio");

const getPostTitles = async() => {
    try {
        const { data } = await axios.get("https://chaldal.com/fresh-vegetable");
        const $ = cheerio.load(data);

        const postTitles = [];
        // return "shauwa"
        // return $('div > p.web-header-address > span.web-header-address-title').text();
        $("div.imageWrapper").each((_idx, el) => {
            // console.log(el)
            // const postTitle = $(el).text();
            // const image = $(el).attr().src;
            const postTitle = $(el).find(".name").text();
            // const image = $(el).find(".imageWrapperWrapper > img").attr().src;
            const image = "shit"
            const quantity = $(el).find(".subText").text();
            let price = "";
            $(el)
                .find(".price > span")
                .each((_, elem) => {
                    price = $(elem).text();
                });
            let discountedPrice = '';
            $(el)
                .find(".discountedPrice > span")
                .each((_, elem) => {
                    discountedPrice = $(elem).text();
                });

            let obj = {
                title: postTitle,
                image: image,
                quantity: quantity,
                discountedPrice: discountedPrice,
                price: price,
            };
            postTitles.push(obj);
        });

        return postTitles;
    } catch (error) {
        throw error;
    }
};

getPostTitles().then((postTitles) => console.log(postTitles));