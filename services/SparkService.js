const puppeteer = require('puppeteer')

class LinkedinService
{
    url = 'https://spark-interfax.ru/'

    parse = async (query) => {
        query = query.replace('www.', '')
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1780
            }
        })
        const page = await browser.newPage()
        await page.goto(this.url)

        await page.waitForSelector('.login-form__input[name="username"]')
        await page.waitForSelector('.login-form__input[name="password"]')
        await page.type('.login-form__input[name="username"]', 'EP2401T_1')
        await page.type('.login-form__input[name="password"]', 'U4fWuTV')
        await page.click('form.js-login-form button[type="submit"]')
        // await page.screenshot({path: 'example1.png'})

        await page.waitForSelector('input.search-global-typeahead__input')
        await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${query}`)
        await page.waitForSelector('main.scaffold-layout__main')
        await page.waitForSelector('.search-results-container')

        const data = await page.evaluate(resultsSelector => {
            const blocks = Array.from(document.querySelectorAll('ul.reusable-search__entity-result-list li'));
            if (!blocks.length) return null;

            const block = blocks[0]

            return {
                logo_url: block.querySelector('.ivm-image-view-model img').getAttribute('src'),
                url: block.querySelector('.app-aware-link').getAttribute('href'),
            }
        }, 'ul.reusable-search__entity-result-list li');

        return data || {
            logo_url: '',
            url: ''
        }
    }
}

module.exports = new LinkedinService()