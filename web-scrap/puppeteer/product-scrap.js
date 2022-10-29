require("dotenv").config();
var fs = require("fs");
const { exit } = require("process");


const puppeteer = require("puppeteer");

// starting Puppeteer
let product_url = process.env.SCRAP_PRODUCT_URL;
const urlSplit = product_url.split("/");
const jsonFileName = urlSplit[urlSplit.length - 1];

console.log(product_url);

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

puppeteer
    .launch()
    .then(async() => {
        // opening a new page and navigating to Reddit
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-notifications",

            ], // these are used to disable notification
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
                        coords: {
                            accuracy: 21,
                            altitude: null,
                            altitudeAccuracy: null,
                            heading: null,
                            latitude: 23.757746874554694,
                            longitude: 90.42752224110437,
                            speed: null,
                        },
                    });
                }, 3000);
            };
        });
        await page.goto(product_url);
        await autoScroll(page);
        await page.waitForSelector("body");

        // manipulating the page's content
        let grabPosts = await page.evaluate(() => {
            let allPosts = document.body.querySelectorAll(".product");

            //storing the post items in an array then selecting for retrieving content

            scrapeItems = [];
            allPosts.forEach((item) => {
                console.log(item);
                // let postTitle = item.querySelectorAll(('.name')).forEach(item => {
                //     scrapeItems.push(item.innerText);
                // });
                let title = item.querySelector(".name").innerText;
                let image = "";
                let price = "";
                let discountedPrice = "";
                item.querySelectorAll(".imageWrapperWrapper").forEach((item) => {
                    image = item.querySelector("img").getAttribute("src");
                });
                item.querySelectorAll(".price").forEach((item) => {
                    price = item.querySelector("span:nth-child(2)").innerText;
                });
                item.querySelectorAll(".discountedPrice").forEach((item) => {
                    discountedPrice = item.querySelector("span:nth-child(2)").innerText;
                });

                let quantity = item.querySelector(".subText").innerText;
                // scrapeItems.push(postDescription.innerText);

                let data = {
                    title: title,
                    image: image,
                    quantity: quantity,
                    discountedPrice: discountedPrice,
                    price: price,
                };
                scrapeItems.push(data);
                //     postTitle: postTitle ? postTitle.innerText : null,
                //     postDescription: postDescription ? postDescription.innerText : null,
                // });
            });

            // let items = {
            //     "redditPosts": scrapeItems,
            // };

            return scrapeItems;
        });

        // outputting the scraped data

        const data = grabPosts;

        const directoryToKeePAllScraps = "./web-scrap/scraped-data/products";
        const tempDirectory = "./web-scrap/scraped-data";
        fs.writeFile(
            `${directoryToKeePAllScraps}/${jsonFileName}.json`,
            JSON.stringify(data),
            (err) => {
                if (err) throw err;
                console.log(
                    `Data written to file to ${directoryToKeePAllScraps}/${jsonFileName}.json`
                );
            }
        );
        fs.writeFile(
            `${tempDirectory}/products.json`,
            JSON.stringify(data),
            (err) => {
                if (err) throw err;
                console.log(
                    `Data written to file to ${tempDirectory}/products.json`
                );
            }

        );
        console.log(grabPosts);
        // closing the browser
        await browser.close();
        // exit();
        process.exit();
    })
    .catch(function(err) {


    });