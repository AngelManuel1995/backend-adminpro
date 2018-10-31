const express = require('express')

let app = express()

//GET ALL 
app.get('/', (req, res) => {
    res.status(200).json({ok:true})
})
//GET ONE
app.get('/:id', (req, res) => {

})
//POST 
app.post('/', (req, res) => {

})
//DELETE
app.delete('/:id', (req, res) => {

})

module.exports =  app

