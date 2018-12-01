const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb')
let Usuario = require('../models/usuario')

let app = express()

//GET ALL 
app.get('/', (req, res) => {
    Usuario.find({}, 'nombre').exec().then(usuarios => {
        if(usuarios.length === 0){
            return res.status(200).json({OK:true, mensaje:'Cero registros'})
        }
        res.json({OK:true, data:usuarios})
    }).catch((err) => {
        res.send(err)
    })
})

//POST 
app.post('/', (req, res) => {
    let body = _.pick(req.body,['nombre', 'email', 'password', 'img', 'role'])
    let usuario = new Usuario({nombre:body.nombre, email:body.email, password: bcrypt.hashSync( body.password, 10), img:body.img, role:body.role})

    usuario.save().then( ( usuario ) => {
        res.send(usuario)
    }).catch( (err) => {
        res.send(err)
    })
})

//GET ONE
app.get('/:id', (req, res) => {

})

app.put('/:id', (req, res) => {

    let id = req.params.id
    let body = req.body

    if(!ObjectID.isValid(id)){
       return  res.status(400).json({OK:false, mensaje:'id de busqueda no válido'} )
    }

    Usuario.findById(id).then( ( usuario ) => {
       
        if(!usuario){
            return res.status(400).json({
                OK:false,
                mensaje:'El usuario no existe',
                errors: {mensaje : 'No exite usuario con ese id'}
            })
        }

        usuario.nombre = body.nombre
        usuario.email = body.email
        usuario.role = body.role
        usuario.password = ':('

        usuario.save()
        .then( (usuario) => {
            res.status(200).json({OK:true, usuario})
        }).catch( (err) => {
            res.status(400).json({
                OK:false,
                mensaje:'Error al actualizar el usario',
                errors: err
            })
        })


    }).catch( ( err ) => {
        res.status(400).json({OK:false})
    })
})

//DELETE
app.delete('/:id', (req, res) => {
    let id = req.params.id
    Usuario.findByIdAndRemove(id).then((respuesta) => {
        res.status(200).json({OK:true, usuario:respuesta})
    }).catch( (err) => {
        res.status(500).json({
            OK:false,
            mensaje:'Error al borrar el usuario',
            errors:err
        })
    })
})

module.exports =  app

