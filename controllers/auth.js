const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            
            return res.status(404).json({
                ok: false,
                msg: `No existe ningún usuario con el email ${ email }`
            });
        }

        // Validar contraseña
        const passwordValido = bcryptjs.compareSync( password, usuarioDB.password );

        if ( !passwordValido ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña incorrecta XD'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuarioDB.id );

        return res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log( error );

        res.json({
            ok: false,
            msg: 'Error hable con el administrador'
        })
    }

}


module.exports = {
    login
}