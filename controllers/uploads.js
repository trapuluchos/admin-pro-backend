const fs = require('fs');

const { response, request } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizaraImagen } = require("../helpers/actualizar-imagen");
const path = require('path');

const fileUpload = ( req = request, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = [ 'usuarios', 'medicos', 'hospitales' ];

    if ( !tiposValidos.includes( tipo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un usuario, medico u hospital (tipo)'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subió ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.imagen;

    // Extraer la extension de la imagen
    const nombreCortado = file.name.split('.'); // batman.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ]; 

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El archivo no tiene una extesión permitida'
        });
    }

    // Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Guardar el archivo
    file.mv( path , function(err) {
        if (err){
            console.log( err );
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            })
        }
    
        // Actualizar la base de datos
        actualizaraImagen( tipo, id, nombreArchivo );


        res.json({
            ok: true,
            msg: 'El archivo se subió correctamente',
            nombreArchivo
        });
    });

}


const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    if ( fs.existsSync( pathImg ) ) {
        
        res.sendFile( pathImg );
    
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        
        res.sendFile( pathImg );
    }




}

module.exports = {
    fileUpload,
    retornaImagen
}