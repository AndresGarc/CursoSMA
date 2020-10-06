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