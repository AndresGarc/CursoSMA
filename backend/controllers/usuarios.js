//aplica la logica de negocio

//require de modelos de datos
const Usuario = require('../models/usuario'); //objeto usuarios

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre apellidos'); //find sin filtros 

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios: usuarios
    });
}

const crearUsuarios = async(req, res) => {

    res.json({
        ok: true,
        msg: 'crearUsuarios',
    });
}

const actualizarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarUsuario',
    });
}

const borrarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'borrarUsuario',
    });
}

module.exports = { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario };