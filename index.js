const process = require('process')
require('dotenv').config()
const express = require('express')
const readRouter = require('./routers/readRouter')

const app = express()
const PORT = process.env.PORT || 5010

app.use(express.json())
app.use('/read', readRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('server started on PORT: ' + PORT))

    } catch (e) {
        console.log(e)
    }
}

start()