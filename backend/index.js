/*
Importación de módulos
*/

//llamamos a express
const express = require('express');
const app = express(); //creamos la app de express

//para abrirla
//puerto en el que escucha , mensaje
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
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