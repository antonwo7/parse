const puppeteer = require('puppeteer')
const fs = require('fs')
const OpenAI = require('openai')
const texts = require('../texts')

class ChatGPTService
{
    constructor () {
        this.openai = new OpenAI({ apiKey: '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' })
    }

    parse = async (query) => {
        const results = []

        for (let text of texts) {
            const data = await this.openai.chat.completions.create({
                messages: [{
                    role: 'system',
                    content: 'give me all the recipients of the bankruptcy (name, CIF/NIF/NIE) in json without any aditional text and without comments from this text: "' + text + '"'
                }],
                model: "gpt-3.5-turbo",
            })

            results.push(data.choices[0].message)
        }


        return results
    }
}

module.exports = new ChatGPTService()