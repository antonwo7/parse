const Router = require('express')
const cors = require('cors')
const router = new Router()
const ReadController = require('../controllers/ReadController')
const ChatGPTController = require('../controllers/ChatGPTController')
const { check } = require('express-validator')

router.use(cors())

router.get('/judicial', [
    check('query', 'Query error').notEmpty()
], ReadController.readJudicial)

router.get('/tender', [
    check('query', 'Query error').notEmpty()
], ReadController.readTed)

router.get('/data-gov', [
    check('query', 'Query error').notEmpty()
], ReadController.readDataGov)

router.get('/chatgpt', [
    check('query', 'Query error').notEmpty()
], ChatGPTController.readRecipients)

router.get('/linkedin', [
    check('query', 'Query error').notEmpty()
], ReadController.readLinkedin)

router.get('/spark', [
    check('query', 'Query error').notEmpty()
], ReadController.readSpark)

router.get('/twitter-circle', [
    check('query', 'Query error').notEmpty()
], ReadController.readTwitterCircle)

module.exports = router