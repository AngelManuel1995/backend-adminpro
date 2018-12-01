const express = require('express')
const bcrypt = require('bcryptjs');
let Usuario = require('../models/usuario')

let app = express()

app.post('/', (req, res) => {

    let body = req.body
    Usuario.findOne({email: body.email}).then((usuario) => {
        
        if(!usuario){
            return res.status(400).json({
                OK:false,
                mensaje:'Error al buscar el usuario'
            })
        }

        if(!bcrypt.compareSync(body.password, usuario.password)){
            return res.status(400).json({
                OK:false,
                mensaje:'Error al buscar el usuario - contraseña'
            })
        }

        //Crear token

        res.status(200).json({
            OK:true,
            usuario:usuario,
            id: usuario.id
        })


    }).catch((err) => {
        res.status(500).json({
            OK:false,
            mensaje:'Error al buscar usuario',
            erros:err
        })
    })
})

module.exports = app