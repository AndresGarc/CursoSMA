//archivo para recuperar y almacenar informacion de usuario
//SCHEMA - estructura de los registros de una coleccion de una base de datos
//MODELS - instancia que permite ejecutar ,sobre una base de datos, acciones siguiendo el esquema

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
        default: 'ALUMNO'
    },
}, { collection: 'usuarios' }); //que se almacena en usuarios


//este metodo modifica el tojson para enviar los datos que queremos al frontend
//sobreescritura de metodo
// ...-> se guardan el resto de datos en ese objeto
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id; //renombro el campo _id a uid
    return object;
});


//exportamos el modelo de datos creado a raiz del esquema, asi podemos utilizarlo 
module.exports = model('Usuario', UsuarioSchema);