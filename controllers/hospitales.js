const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async ( req, res = response ) => {

    try {    

        const hospitales = await Hospital.find().populate('usuario', 'nombre img')

        res.json({
            ok: true,
            hospitales
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        ...req.body,
        usuario: uid 
    });

    try {    

        const hospitalDB = await hospital.save();

        return res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const actualizarHospital = async ( req, res = response ) => {

    try {    
        res.json({
            ok: true,
            msg: 'actualizarHospital'
        });
        
    } catch (error) {
        console.log( error );
    }

}


const eliminarHospital = async ( req, res = response ) => {
    
    try {    
        res.json({
            ok: true,
            msg: 'eliminarHospital'
        });
        
    } catch (error) {
        console.log( error );
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}