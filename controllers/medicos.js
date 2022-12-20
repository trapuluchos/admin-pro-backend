const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async ( req, res = response ) => {

    try {    
        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre email img')
                                    .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            medicos
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico({
        ...req.body,
        usuario: uid
    })

    try {
        const medicoDB = await medico.save();
        
        return res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const actualizarMedico = async ( req, res = response ) => {

    try {    
        res.json({
            ok: true,
            msg: 'actualizarMedico'
        });
        
    } catch (error) {
        console.log( error );
    }

}


const eliminarMedico = async ( req, res = response ) => {
    
    try {    
        res.json({
            ok: true,
            msg: 'eliminarMedico'
        });
        
    } catch (error) {
        console.log( error );
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}