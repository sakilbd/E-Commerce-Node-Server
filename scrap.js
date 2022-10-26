const axios = require('axios');
const cheerio = require('cheerio');

const getPostTitles = async() => {
    try {
        const { data } = await axios.get(
            'https://chaldal.com/food'
        );
        const $ = cheerio.load(data);

        const postTitles = [];
        // return "shauwa"
        // return $('div > p.web-header-address > span.web-header-address-title').text();
        $('div.name').each((_idx, el) => {
            const postTitle = $(el).text()
            postTitles.push(postTitle)
        });

        return postTitles;
    } catch (error) {
        throw error;
    }
};

getPostTitles()
    .then((postTitles) => console.log(postTitles));