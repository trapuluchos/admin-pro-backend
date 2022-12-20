const { Router } = require('express');

const { 
    getMedicos, 
    crearMedico, 
    actualizarMedico, 
    eliminarMedico 
} = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const router = Router();


router.get( '/',
    [
        validarJWT
    ],
    getMedicos
);
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);
router.put( '/:id', actualizarMedico);
router.delete( '/:id', eliminarMedico);


module.exports = router;