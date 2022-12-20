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
app.use( '/api/login', require( './routes/login' ) );
app.use( '/api/hospitales', require( './routes/hospitales' ) );
app.use( '/api/medicos', require( './routes/medicos' ) );
app.use( '/api/todo', require( './routes/busquedas' ) );
app.use( '/api/upload', require( './routes/uploads' ) );



app.listen( process.env.PORT , ( req, rep ) => {
    console.log(`Servidor corriendo el puerto ${ process.env.PORT }`);
});

