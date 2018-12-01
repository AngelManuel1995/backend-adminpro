const jwt = require('jsonwebtoken')
const SEED = require('../config/config').SEED

exports.verificaToken = function(req, res, next ){
    let token = req.query.token

    jwt.verify(token, SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                OK:false,
                mensaje:'Token incorrecto',
                errors: err
            })
        }

        req.usuario = decoded.usuario
        
        next()
    })
}