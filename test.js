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