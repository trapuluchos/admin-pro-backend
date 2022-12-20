const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {    
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }
}

const actualizaraImagen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch ( tipo ) {
        
        case 'usuarios':

            const usuario = await Usuario.findById( id );
    
            if ( !usuario ) {
                console.log('Usuario no existe');
                return false;
            }
    
            // Eliminar la imagen anterior
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );
    
            // Actualizar DB
            usuario.img = nombreArchivo;
            await usuario.save();
    
            return true;
        break;

        case 'medicos':
            const medico = await Medico.findById( id );

            if ( !medico ) {
                console.log('Medico no existe');
                return false;
            }

            // Eliminar la imagen anterior
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            // Actualizar DB
            medico.img = nombreArchivo;
            await medico.save();

            return true;

        break;

        case 'hospitales':
        
            const hospital = await Hospital.findById( id );

            if ( !hospital ) {
                console.log('Hospital no existe');
                return false;
            }

            // Eliminar la imagen anterior
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            // Actualizar DB
            hospital.img = nombreArchivo;
            await hospital.save();

            return true;
        break;

    }

}


module.exports = {
    actualizaraImagen
}