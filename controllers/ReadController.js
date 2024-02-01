const JudicialService = require("../services/JudicialService")
const TedService = require("../services/TedService")
const DataGovService = require("../services/DataGovService")
const LinkedinService = require("../services/LinkedinService")
const TwitterCircleService = require("../services/TwitterCircleService")

const Controller = require('../controllers/Controller')
require('dotenv').config()
const {validationResult} = require('express-validator')

class ReadController extends Controller
{
    readJudicial = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const links = await JudicialService.parse(query)

            this.success(res, links)

        } catch (e) {
            this.error(res, e)
        }
    }

    readTed = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const links = await TedService.parse(query)

            this.success(res, links)

        } catch (e) {
            this.error(res, e)
        }
    }

    readDataGov = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const data = await DataGovService.parse(query)

            this.success(res, data)

        } catch (e) {
            this.error(res, e)
        }
    }

    readLinkedin = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const data = await LinkedinService.parse(query)

            this.success(res, data)

        } catch (e) {
            this.error(res, e)
        }
    }

    readSpark = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const data = await SparkService.parse(query)

            this.success(res, data)

        } catch (e) {
            this.error(res, e)
        }
    }

    readTwitterCircle = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return this.unsuccess(res, { message: 'Company editing error', errors: errors })

            const {query} = req.query

            const data = await TwitterCircleService.parse(query)

            this.success(res, data)

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new ReadController()