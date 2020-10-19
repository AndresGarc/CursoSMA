//aplica la logica de negocio

//require de modelos de datos
const Curso = require('../models/cursos'); //objeto usuarios
const validator = require('validator');
const bcrypt = require('bcryptjs'); //libreria cifrado

const getCurso = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const regpp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    let total, usuarios;

    try {

        res.json({
            ok: true,
            msg: 'Cursos obtenidos correctamente'
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }

}

const crearCurso = async(req, res) => {

    try {

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error'
        });
    }

}

//no permite actualizar la contraseña
const actualizarCurso = async(req, res) => {

    try {

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error'
        });
    }
}

const borrarCurso = async(req, res) => {

    try {

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error'
        });
    }
}

module.exports = { getCurso, crearCurso, actualizarCurso, borrarCurso };