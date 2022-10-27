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
        $('a.category > div ').each((_idx, el) => {
            // console.log(el)
            // const postTitle = $(el).text();
            // const image = $(el).attr().src;
            const postTitle = $(el).find('.name').text();
            const image = $(el).find('img').attr().src;
            let obj = {
                title: postTitle,
                image: image
            }
            postTitles.push(obj)
        });

        return postTitles;
    } catch (error) {
        throw error;
    }
};

getPostTitles()
    .then((postTitles) => console.log(postTitles));