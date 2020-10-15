//aplica la logica de negocio

//require de modelos de datos
const Usuario = require('../models/usuario'); //objeto usuarios
const bcrypt = require('bcryptjs'); //libreria cifrado
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}); //find sin filtros / si quiero filtros: , y escribo los campos

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios: usuarios
    });
}

const crearUsuarios = async(req, res) => {

    try {
        const { email, password } = req.body; //ESTA LOCURA TE SACA SOLO EL EMAIL
        const usuario = await Usuario.findOne({ email: email }); //
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }
        const salt = bcrypt.genSaltSync(); //cadena aleatoria
        const cpassword = bcrypt.hashSync(password, salt); //cifrado contraseña

        //te creo el nuevo objeto de usuario
        const newusu = new Usuario(req.body);
        newusu.password = cpassword;
        // await newusu.save(); PA GUARDAR EL OBJETO EN LA BD

        res.json({
            ok: true,
            msg: 'crearUsuarios',
            newusu
        });


    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'CrearUsuario'
        });
    }

}

const actualizarUsuario = async(req, res) => {

    const { email, password, ...object } = req.body; //el object se queda con el resto de datos
    const uid = req.params.id; //nos lo guardamos para las comprobaciones

    try {

        //ver si existe un email igual
        const exsemail = await Usuario.findOne({ email: email });
        if (exsemail) {
            //si es el suyo comprobamos
            if (exsemail._id != uid) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }
        }
        object.email = email;
        const newusu = await Usuario.findByIdAndUpdate(uid, object, { new: true }); //ACTUALIZA EL USUARIO - el new es para que sea vea que se ha sobreescrito
        res.json({
            ok: true,
            msg: 'Datos actualizados'
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error',
        });
    }
}

const borrarUsuario = async(req, res) => {

    const uid = req.params.id;

    try {
        //comprobar si existe el usuario
        const usu = await Usuario.findById(uid);
        if (!usu) { //si no existe borro
            return res.status(400).json({
                ok: false,
                msg: 'No existe'
            });
        }
        //si existe
        const resultao = await Usuario.findByIdAndRemove(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado',
            resultao
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}

module.exports = { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario };