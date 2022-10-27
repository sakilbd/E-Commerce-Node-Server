const puppeteer = require('puppeteer');

// starting Puppeteer
puppeteer.launch().then(async() => {

    // opening a new page and navigating to Reddit
    const browser = await puppeteer.launch({
        headless: false
    });

    // Create a new page
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.reddit.com/r/scraping/');
    await page.waitForSelector('body');

    // manipulating the page's content
    let grabPosts = await page.evaluate(() => {

        let allPosts = document.body.querySelectorAll('.Post');

        //storing the post items in an array then selecting for retrieving content

        scrapeItems = [];
        allPosts.forEach(item => {
            let postTitle = item.querySelector('h3');
            let postDescription = item.querySelector('p');

            scrapeItems.push({
                postTitle: postTitle ? postTitle.innerText : null,
                postDescription: postDescription ? postDescription.innerText : null,
            });
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