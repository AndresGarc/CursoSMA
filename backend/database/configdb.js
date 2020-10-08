//archivo para conectarnos la base de datos

const mongoose = require('mongoose'); //importar mongoose -> objeto tipo MONGO
require('dotenv').config();

//crear el objeto conexion que tiene una funcion sin nombre
const dbConnection = async() => {
    try {
        //que es AWAIT y los parametros de dentro
        //PARAMETRO -- modificadores para hacer que la conexion funcione correctamente
        //AWAIT -> puede tardar la conexion, entonces hay que asegurarse que esto 
        // esta cargado antes de iniciar la conexion con la aplicacion
        await mongoose.connect(process.env.DBCONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos activada bb');

    } catch (error) { //catchea todo error
        console.log(error);
        throw new Error('Error al conectar la bd'); //buena manera de manejar un error
    }
}

module.exports = { dbConnection }; // exportar el objeto sin funcion