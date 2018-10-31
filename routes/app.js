const express = require('express')

let app = express()

app.get('/', (req, res) => {
    res.send(200)
})

module.exports = app