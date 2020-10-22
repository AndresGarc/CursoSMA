// MODELO DE DATOS DE ASIGNATURAS

const { Schema, model } = require('mongoose');

const AsignaturasSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    nombrecorto: {
        type: String,
        required: true,
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    profesores: [{
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    }]
}, { collection: 'asignaturas' }); //que se almacena en usuarios


//este metodo modifica el tojson para enviar los datos que queremos al frontend
//sobreescritura de metodo
// ...-> se guardan el resto de datos en ese objeto
AsignaturasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id; //renombro el campo _id a uid
    return object;
});


//exportamos el modelo de datos creado a raiz del esquema, asi podemos utilizarlo 
module.exports = model('Asignatura', AsignaturasSchema);