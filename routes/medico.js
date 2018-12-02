const express = require('express')
const _ = require('lodash')

const { ObjectID } = require('mongodb')
let Medico = require('../models/medico')
let mdAntenticacion = require('../middlewares/autenticacion')

let app = express()

//GET ALL 
app.get('/', (req, res) => {
    Medico.find({})
    .populate('usuario', 'nombre email')
    .populate('hospital')
    .exec().then(medicos => {
        if(medicos.length === 0){
            return res.status(200).json({OK:true, mensaje:'Cero registros'})
        }
        res.json({OK:true, data:medicos})
    }).catch((err) => {
        res.send(err)
    })
})

//POST 
app.post('/', mdAntenticacion.verificaToken, (req, res) => {
    let body = req.body
    let _id = req.usuario._id
    let medico = new Medico(
        {
            nombre:body.nombre, 
            usuario:_id, 
            hospital:body.hospital, 
        })

    medico.save().then( ( medico ) => {
        res.status(201).json({OK:true, medico:medico})
    }).catch( (err) => {
        res.send(err)
    })
})

//GET ONE
app.get('/:id', (req, res) => {

})

app.put('/:id',mdAntenticacion.verificaToken, (req, res) => {

    let id = req.params.id
    let body = req.body

    if(!ObjectID.isValid(id)){
       return  res.status(400).json({OK:false, mensaje:'id de busqueda no válido'} )
    }

    Medico.findById(id).then( ( medico ) => {
        if(!medico){
            return res.status(400).json({
                OK:false,
                mensaje:'El medico no existe',
                errors: {mensaje : 'No exite medico con ese id'}
            })
        }

        medico.nombre = body.nombre
        medico.hospital = body.hospital
        medico.usuario = req.usuario._id

        medico.save()
        .then( (medico) => {
            res.status(200).json({OK:true, medico})
        }).catch( (err) => {
            res.status(400).json({
                OK:false,
                mensaje:'Error al actualizar el medico',
                errors: err
            })
        })


    }).catch( ( err ) => {
        res.status(400).json({OK:false})
    })
})

//DELETE
app.delete('/:id', mdAntenticacion.verificaToken, (req, res) => {
    let id = req.params.id
    Medico.findByIdAndRemove(id).then((medico) => {
        res.status(200).json({OK:true, medico:medico})
    }).catch( (err) => {
        res.status(500).json({
            OK:false,
            mensaje:'Error al borrar el medico',
            errors:err
        })
    })
})

module.exports =  app

