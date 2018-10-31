const mongoose = require('mongoose')

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'Campo nombre requerido'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Campo email requerido'],
    },
    password:{
        type:String,
        required:[true, 'Campo password requerido'],
    },
    img:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        required:[true, 'Campo requerido'],
        default:'USER_ROLE'
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)