/*
Importación de módulos
*/

//llamamos a express
const express = require('express');
const cors = require('cors'); //import
const { dbConnection } = require('./database/configdb');
require('dotenv').config(); //carga lo que haya en el archivo .env en un elemento process.env
//EL ELEMENTO PROCESS SIEMPRE ESTA AHI

const app = express(); //creamos la app de express

dbConnection(); //llamada al objeto con la funcion ARRANCAR BASE DE DATOS

//viene CORS -> solicitar recursos externos -> ovh/web a eps/api ???
//esto le dice a express que utilizaremos un middelware para las rutas
//app tendrá funciones de cors
app.use(cors());

//para abrirla
//puerto en el que escucha , mensaje
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});

//PRIMER GET --> hace un get al recurs raiz, y responde con un mensaje
//primer parametro -> ruta
//segundo parametro ??
app.get('/', (req, res) => {
    //le enviamos una respuesta en forma de json????
    //este mensaje es personalizable A PODER SER TODOS IGUALES
    res.json({
        ok: true,
        msg: 'Respuesta'
    });
});