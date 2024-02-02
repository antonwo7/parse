const playwright = require('playwright')

class LinkedinService
{
    url = 'https://www.linkedin.com/'

    parse = async (query) => {
        query = query.replace('www.', '')
	
        const browser = await playwright['chromium'].launch({ 
			headless: true,
			args: [
				'--proxy-server=http://a7fc0f21c2899ddee9dac40a1d3c5fc904186b1b:device=desktop@proxy.zenrows.com:8001'
			]
		});
		const context = await browser.newContext();
		const page = await context.newPage();
		await page.goto("https://google.com/");
		await page.screenshot({path: 'example-p1.png'})

		await page.type('#session_key', 'antonwo7@gmail.com')
		await page.type('#session_password', 'cobain1967')
		await page.click('button[data-id="sign-in-form__submit-btn"]')
		await page.waitForTimeout(2000)
		await page.screenshot({path: 'example1.png'})

		await page.waitForSelector('input.search-global-typeahead__input')
		await page.screenshot({path: 'example2.png'})
		await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=seat.es`)
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

		if (data.url) {
			await page.goto(data.url + 'people/')
			await page.waitForSelector('.artdeco-card.org-people-profile-card__card-spacing')

			let prevHeight = -1
			let maxScrolls = 3
			let scrollCount = 0

			while (scrollCount < maxScrolls) {
				await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
				await page.waitForTimeout(1500)
				let newHeight = await page.evaluate('document.body.scrollHeight');
				if (newHeight === prevHeight) break;

				prevHeight = newHeight
				scrollCount += 1
			}

			await page.screenshot({path: 'example3.png'})
			const peopleData = await page.evaluate(resultsSelector => {
				const blocks = Array.from(document.querySelectorAll('.artdeco-card.org-people-profile-card__card-spacing ul li'));
				if (!blocks.length) return [];

				let people = blocks.map(block => {
					const titleNode = block.querySelector('.org-people-profile-card__profile-title')
					const positionNode = block.querySelector('.artdeco-entity-lockup__subtitle .lt-line-clamp')
					if (!titleNode && !positionNode) return false;

					const person = {
						name: block.querySelector('.org-people-profile-card__profile-title').innerHTML.replace('<!---->', '').replace("\n", '').trim(),
						image: block.querySelector('.artdeco-entity-lockup__image img').getAttribute('src'),
						position: block.querySelector('.artdeco-entity-lockup__subtitle .lt-line-clamp').innerHTML.replace('<!---->', '').replace("\n", '').trim()
					};

					const link = block.querySelector('a.app-aware-link')
					if (!link) return false;

					person.url = link.getAttribute('href').split('?')[0]
					return person

				}).filter(Boolean)

				return people
			}, '.artdeco-card.org-people-profile-card__card-spacing ul li');

			data.people = peopleData
		}

        return data || {
            logo_url: '',
            url: ''
        }
    }
}

module.exports = new LinkedinService()
