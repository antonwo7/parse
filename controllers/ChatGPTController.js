const JudicialService = require("../services/JudicialService")
const TedService = require("../services/TedService")
const DataGovService = require("../services/DataGovService")
const ChatGPTService = require("../services/ChatGPTService")

const Controller = require('../controllers/Controller')
require('dotenv').config()
// const {validationResult} = require('express-validator')

class ChatGPTController extends Controller
{
    readRecipients = async (req, res) => {
        try {
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const links = await ChatGPTService.parse(query)

            this.success(res, {result: links})

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new ChatGPTController()