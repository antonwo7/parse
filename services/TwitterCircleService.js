const puppeteer = require('puppeteer')

class TwitterCircleService
{
    url = 'https://twittercircle.com/'

    parse = async (query) => {
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1780
            },
            headless: false
        })
        const page = await browser.newPage()
        await page.goto(this.url)

        await page.waitForSelector('#ez-accept-all')
        await page.click('#ez-accept-all')
        await page.waitForTimeout(1000)
        await page.waitForTimeout(10000)
        await page.screenshot({path: 'example1.png'})
        await page.goto(this.url)
        await page.waitForSelector('input#username')
        await page.type('input#username', query)
        await page.click('button#generate')
        await page.waitForSelector('#circle1')
        await page.screenshot({path: 'example3.png'})

        let items = []

        let links = await page.evaluate(resultsSelector => {
            return Array.from(document.querySelectorAll('#circle1 ul li')).map(block => {
                console.log('block', block)
                const image = block.querySelector('img').getAttribute('src')
                const name = block.querySelector('span').innerHTML
                return {image, name};
            });
        }, '#circle1 ul li');

        items = items.concat(links)

        links = await page.evaluate(resultsSelector => {
            return Array.from(document.querySelectorAll('#circle2 ul li')).map(block => {
                const image = block.querySelector('img').getAttribute('src')
                const name = block.querySelector('span').innerHTML
                return {image, name};
            });
        }, '#circle2 ul li');

        items = items.concat(links)

        links = await page.evaluate(resultsSelector => {
            return Array.from(document.querySelectorAll('#circle3 ul li')).map(block => {
                const image = block.querySelector('img').getAttribute('src')
                const name = block.querySelector('span').innerHTML
                return {image, name};
            });
        }, '#circle3 ul li');

        items = items.concat(links)


        return items;
    }
}

module.exports = new TwitterCircleService()