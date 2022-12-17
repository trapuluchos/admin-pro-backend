require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

// Base de datos
dbConnection();

// Cors
app.use( cors() );

// Lectura y parseo del Body
app.use( express.json() );

// Rutas
app.use( '/api/usuarios', require( './routes/usuarios' ) );
app.use( '/api/auth', require( './routes/auth' ) );



app.listen( process.env.PORT , ( req, rep ) => {
    console.log(`Servidor corriendo el puerto ${ process.env.PORT }`);
});

