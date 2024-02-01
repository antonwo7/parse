const puppeteer = require('puppeteer')

class DataGovService
{
    url = 'https://datos.gob.es/es'

    parse = async (query) => {
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1780
            }
        })
        const page = await browser.newPage()
        await page.goto(this.url)

        await page.waitForSelector('ul.menu li.leaf:nth-child(9)')
        await page.click('ul.menu li.leaf:nth-child(9)')
        await page.waitForSelector('.block-dge-search.block-search.is-visible')
        await page.type('#edit-search-block-form', query)
        await page.click('#edit-submit--3')

        await page.waitForSelector('.dge-list.dge-list--dataset')

        const data = await page.evaluate(resultsSelector => {
            const blocks = Array.from(document.querySelectorAll('.dge-list.dge-list--dataset ul li.dataset-item'));
            return blocks.map(block => {
                const link = block.querySelector('.dataset-content .dge-list__title a')
                return {
                    url: 'https://datos.gob.es' + link.getAttribute('href'),
                    title: link.innerHTML,
                    resource: block.querySelector('.publisher-title a').innerHTML,
                    description: block.querySelector('.dge-list__desc').innerHTML
                };
            });
        }, '.dge-list.dge-list--dataset ul li');


        return data
    }
}

module.exports = new DataGovService()