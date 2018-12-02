const express = require('express')
const _ = require('lodash')

const { ObjectID } = require('mongodb')
let Hospital = require('../models/hospital')
let mdAntenticacion = require('../middlewares/autenticacion')

let app = express()

//GET ALL 
app.get('/', (req, res) => {
    Hospital.find({})
    .populate('usuario', 'nombre email')
    .exec().then(hospitales => {
        if(hospitales.length === 0){
            return res.status(200).json({OK:true, mensaje:'Cero registros'})
        }
        res.json({OK:true, data:hospitales})
    }).catch((err) => {
        res.send(err)
    })
})

//POST 
app.post('/', mdAntenticacion.verificaToken, (req, res) => {
    let body = req.body
    let _id = req.usuario._id
    console.log(_id)
    let hospital = new Hospital(
        {
            nombre:body.nombre, 
            usuario:_id, 
        })

    hospital.save().then( ( hospital ) => {
        res.status(201).json({OK:true, hospital:hospital})
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

    Hospital.findById(id).then( ( hospital ) => {
       
        if(!hospital){
            return res.status(400).json({
                OK:false,
                mensaje:'El hospital no existe',
                errors: {mensaje : 'No exite hospital con ese id'}
            })
        }

        hospital.nombre = body.nombre
        hospital.usuario = body.usuario._id

        hospital.save()
        .then( (hospital) => {
            res.status(200).json({OK:true, hospital})
        }).catch( (err) => {
            res.status(400).json({
                OK:false,
                mensaje:'Error al actualizar el hospital',
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
    Hospital.findByIdAndRemove(id).then((hospital) => {
        res.status(200).json({OK:true, hospital:hospital})
    }).catch( (err) => {
        res.status(500).json({
            OK:false,
            mensaje:'Error al borrar el hospital',
            errors:err
        })
    })
})

module.exports =  app

