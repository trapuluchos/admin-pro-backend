const { response } = require('express');

const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Usuario = require("../models/usuario");


const getUsuarios = async ( req, res ) => {

    try {
        const usuarios = await Usuario.find({}, 'nombre email role google');
    
        res.json({
            ok: true,
            usuarios
        });
        
    } catch (error) {
        console.log( error );
    }

}

const crearUsuario = async ( req, res = response ) => {

    const { name, email, password } =  req.body;

    try {
        const existeEmail = await Usuario.findOne({ email: email });  

        // console.log( existeEmail ); null 

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            })
        }

        const usuario = new Usuario( req.body );

        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            msg: 'Creando usuario',
            usuario,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}


const actualizarUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        // TODO: Validar token y comprobar si el usuario es correcto
        
        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email: campos.email });  

            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya se encuentra registrado'
                })
            }
        }

        campos.email = email;

        // const usuarioActualizado = await Usuario.findByIdAndUpdate( { _id: uid }, campos )
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok: true,
            msg: 'Desde actualizar usuario',
            usuario: usuarioActualizado
        });

    } catch (error) {

        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}


const eliminarUsuario = async ( req, res = response ) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error... hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}