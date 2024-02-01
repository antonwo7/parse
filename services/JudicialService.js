const puppeteer = require('puppeteer')

class JudicialService
{
    url = 'https://www.poderjudicial.es/search/indexAN.jsp#'

    parse = async (query) => {
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1780
            },
        })
        const page = await browser.newPage()
        await page.goto(this.url)

        await page.waitForSelector('#modalAvisoLegal .modal-dialog .modal-content .modal-header .close')
        await page.click('#modalAvisoLegal .modal-dialog .modal-content .modal-header .close')
        await page.waitForTimeout(2000)
        await page.type('#frmBusquedajurisprudencia_TEXT', query)
        await page.click('#srcjur_search')
        await page.waitForSelector('#jurisprudenciaresults_searchresults')
        await page.screenshot({path: 'example1.png'})
        await page.waitForSelector('#jurisprudenciaresults')

        const links = await page.evaluate(resultsSelector => {
            const blocks = Array.from(document.querySelectorAll('#jurisprudenciaresults .searchresult'));
            return blocks.map(block => {
                const link = block.querySelector('a.new-button')
                const text = block.querySelector('.summary b').innerHTML
                return {
                    url: link.getAttribute('data-link'),
                    title: block.querySelector('a[data-fechares]').innerHTML,
                    text: text
                };
            });
        }, '#jurisprudenciaresults .searchresult');


        return links
    }
}

module.exports = new JudicialService()