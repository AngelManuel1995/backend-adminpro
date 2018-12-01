const express = require('express')
const mongoose = require('mongoose')
const Usuario = require('./models/usuario')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.json())

mongoose.connection.openUri('mongodb://localhost:27017/hospitalesDB', (err, res) => {
    if(err) throw err
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online')
})


//RUTAS
let usuarioRoutes = require('./routes/usuario')
let loginRoutes = require('./routes/login')

app.use('/usuario', usuarioRoutes)
app.use('/login', loginRoutes)

app.get('/', (req, res)=> {
    res.status(200).json({estado:'OK'})
})


app.listen(PORT=3000, () => {
    console.log('Aplicación corriendo en el puerto 3000. \x1b[32m%s\x1b[0m','Online')
})