//archivo para recuperar y almacenar informacion de usuario
//SCHEMA - estructura de los registros de una coleccion de una base de datos
//MODELS - instancia que permite sobre una base de datos ejecutar acciones siguiendo el esquema

const { Schema, model } = require('mongoose');

//esquema para crear un "objeto" de la coleccion usuarios
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'Alumno'
    },
}, { collection: 'usuarios' }); //que se almacena en usuarios

//exportamos el modelo de datos creado a raiz del esquema
module.exports = model('Usuario', UsuarioSchema);