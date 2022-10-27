// Puppeteer will not run without these lines
const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
    /*  For extractedElements, you are selecting the tag and class,
        that holds your desired information,
        then choosing the desired child element you would like to scrape from.
        in this case, you are selecting the
        "<div class=blog-post />" from "<div class=container />" See below: */
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
}

async function scrapeItems(
    page,
    extractItems,
    itemCount,
    scrollDelay = 4000,
) {
    let items = [];
    try {
        let previousHeight;
        while (items.length < itemCount) {
            items = await page.evaluate(extractItems);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitForTimeout(scrollDelay);
        }
    } catch (e) {}
    return items;
}

(async() => {
    // Set up Chromium browser and page.

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,

        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--incognito'],
    });
    // const context = browser.defaultBrowserContext();
    // await context.overridePermissions("https://chaldal.com/fresh-vegetable," ['geolocation']);
    // await page.evaluate(() => document.alert = window.alert = alert = () => {})
    // page.on('dialog', async dialog => {
    //     console.log(dialog.message());
    //     await dialog.dismiss();
    // });

    const page = await browser.newPage();


    page.setViewport({ width: 1280, height: 800 });
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
    // Navigate to the example page.
    await page.goto('https://chaldal.com/fresh-vegetable');

    // Auto-scroll and extract desired items from the page. Currently set to extract ten items.
    const items = await scrapeItems(page, extractItems, 10);

    console.log(items);
    // Save extracted items to a new file.
    // fs.writeFileSync('./items.txt', JSON.stringify(items));

    // Close the browser.
    await browser.close();
})();