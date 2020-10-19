/*
    MODELO DE DATOS DE CURSO
*/
const { Schema, model } = require('mongoose');

//esquema para crear un "objeto" de la coleccion curso
const CursoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    nombrecorto: {
        type: String,
        required: true,
        unique: true
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { collection: 'cursos' }); //que se almacena en usuarios


//este metodo modifica el tojson para enviar los datos que queremos al frontend
//sobreescritura de metodo
// ...-> se guardan el resto de datos en ese objeto
CursoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id; //renombro el campo _id a uid
    return object;
});


//exportamos el modelo de datos creado a raiz del esquema, asi podemos utilizarlo 
module.exports = model('Curso', CursoSchema);