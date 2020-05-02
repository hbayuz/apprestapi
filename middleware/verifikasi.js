const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles){
    return function(req, rest, next){
        //cek authorization header
        var tokenwithBearer = req.header.authorization;
        if(tokenwithBearer) {
            var token = tokenwithBearer.split (' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'Token tidak terdaftar!'});
                }else {
                    if(roles==2){
                        req.auth = decoded;
                        next();
                    }else {
                        return rest.status(401).send({auth:false, message:'Gagal Mengauthorisasi role anda!'});
                    }
                }
            });
        }else {
            return rest.status(401).send({auth:false, message:'Token tidak tersedia!'});
        }
    }
}

module.exports = verifikasi;