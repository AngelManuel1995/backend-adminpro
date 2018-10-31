const express = require('express')
const mongoose = require('mongoose')
const Usuario = require('./models/usuario')

let app = express()

mongoose.connection.openUri('mongodb://localhost:27017/hospitalesDB', (err, res) => {
    if(err) throw err
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online')
})


//RUTAS
let usuarioRoutes = require('./routes/usuario')

app.use('/usuario', usuarioRoutes)

app.get('/', (req, res)=> {
    res.status(200).json({estado:'OK'})
})


app.listen(PORT=3000, () => {
    console.log('Aplicación corriendo en el puerto 3000. \x1b[32m%s\x1b[0m','Online')
})