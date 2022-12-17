const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    
    const payload = {
        uid
    }

    return new Promise( ( resolve, reject ) => {

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if ( err ) {
                // Todo Mal
                console.log( err );
                reject( err );
            } else {
                // Todo Bien
                resolve( token );
            }
        }); 
    });
}


module.exports = {
    generarJWT
}