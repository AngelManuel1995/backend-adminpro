const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'Campo nombre requerido'],
    },
    email:{
        type:String,
        required:[true, 'Campo email requerido'],
        unique:true,
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

// usuarioSchema.methods.ejemplo = function(){
//     let user = this
//     console.log('-----No Static------', user)
// }

// usuarioSchema.statics.ejemplos = function(){
//     let user = this
//     console.log('-----Static-----', user)
// }

// usuarioSchema.pre('save', function(next){
//     let usuario = this
    
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(usuario.password, salt, (err, hash) => {
//             usuario.password = hash
//             next()
//         })
//     })
// })

module.exports = mongoose.model('Usuario', usuarioSchema)