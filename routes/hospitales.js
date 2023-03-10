/**
* RUTA: api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getHospitales, 
    crearHospital, 
    actualizarHospital, 
    eliminarHospital 
} = require('../controllers/hospitales');

const router = Router();


router.get( '/', 
    [
        validarJWT
    ],
    getHospitales 
);

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put( '/:id', 
    [], 
    actualizarHospital 
);

router.delete( '/:id', eliminarHospital );


module.exports = router;