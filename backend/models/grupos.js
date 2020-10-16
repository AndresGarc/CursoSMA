//archivo para recuperar y almacenar informacion de grupos

const { Schema, model } = require('mongoose');

//esquema para crear un "objeto" de la coleccion usuarios
const GrupoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    proyecto: {
        type: String
    },
    proyectodes: {
        type: String,
    }
}, { collection: 'grupos' }); //que se almacena en usuarios


//este metodo modifica el tojson para enviar los datos que queremos al frontend
//sobreescritura de metodo
// ...-> se guardan el resto de datos en ese objeto

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id; //renombro el campo _id a uid
    return object;
});


//exportamos el modelo de datos creado a raiz del esquema, asi podemos utilizarlo 
module.exports = model('Grupos', GrupoSchema);