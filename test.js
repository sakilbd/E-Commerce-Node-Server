const puppeteer = require('puppeteer');

// starting Puppeteer


async function autoScroll(page) {
    await page.evaluate(async() => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
puppeteer.launch().then(async() => {

    // opening a new page and navigating to Reddit
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,

        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--incognito'], // these are used to disable notification 
    });

    // Create a new page
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);


    //this function used to disable location popup 
    await page.evaluateOnNewDocument(function() {
        navigator.geolocation.getCurrentPosition = function(cb) {
            setTimeout(() => {
                cb({
                    'coords': {
                        accuracy: 21,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        latitude: 23.129163,
                        longitude: 113.264435,
                        speed: null
                    }
                })
            }, 3000)
        }
    });
    await page.goto('https://chaldal.com/fresh-vegetable');
    await autoScroll(page);
    await page.waitForSelector('body');


    // manipulating the page's content
    let grabPosts = await page.evaluate(() => {

        let allPosts = document.body.querySelectorAll('.product');

        //storing the post items in an array then selecting for retrieving content

        scrapeItems = [];
        allPosts.forEach(item => {
            console.log(item);
            // let postTitle = item.querySelectorAll(('.name')).forEach(item => {
            //     scrapeItems.push(item.innerText);
            // });
            let postDescription = item.querySelector('.name');
            scrapeItems.push(postDescription.innerText);

            //     postTitle: postTitle ? postTitle.innerText : null,
            //     postDescription: postDescription ? postDescription.innerText : null,
            // });
        });

        let items = {
            "redditPosts": scrapeItems,
        };

        return items;
    });

    // outputting the scraped data
    console.log(grabPosts);
    // closing the browser
    await browser.close();

}).catch(function(err) {
    console.error(err);
});