require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

// Base de datos
dbConnection();

// Cors
app.use( cors() );

// Rutas
app.get( '/', ( req, res ) => {

    res.json({
        ok: true,
        msg: 'desde /'
    });

});

app.listen( process.env.PORT , ( req, rep ) => {
    console.log(`Servidor corriendo el puerto ${ process.env.PORT }`);
});

