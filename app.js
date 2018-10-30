const express = require('express')
const mongoose = require('mongoose')

let app = express()

mongoose.connection.openUri('mongodb://localhost:27017/hospitalesDB', (err, res) => {
    if(err) throw err
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online')
})


app.get('/', (req, res)=> {
    
})

app.listen(PORT=3000, () => {
    console.log('Aplicación corriendo en el puerto 3000. \x1b[32m%s\x1b[0m','Online')
})