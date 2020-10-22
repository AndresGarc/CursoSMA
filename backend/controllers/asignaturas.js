//logica de negocio para el recurso asignatura

//require de modelos de datos
const Asignatura = require('../models/asignaturas'); //objeto usuarios
const Usuario = require('../models/usuario');
const Curso = require('../models/cursos');
const validator = require('validator');
const bcrypt = require('bcryptjs'); //libreria cifrado


const getAsignaturas = async(req, res) => {

    const uid = req.query.id;
    const desde = Number(req.query.desde) || 0;
    const regpp = Number(process.env.DOCSPERPAGE);

    let asignatura, total;

    try {

        if (uid) {
            [asignatura, total] = await Promise.all([
                Asignatura.findById(uid).populate('curso', '-__v').populate('profesores.usuario', '-password -alta -__v'),
                Asignatura.countDocuments()
            ]);
        } else {
            [asignatura, total] = await Promise.all([
                Asignatura.find({}).populate('curso', '-__v').populate('profesores.usuario', '-password -alta -__v').skip(desde).limit(regpp),
                Asignatura.countDocuments()
            ]);
        }

        res.json({
            ok: true,
            msg: 'Asignaturas obtenidas correctamente',
            asignatura,
            total
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const crearAsignatura = async(req, res) => {

    const { curso, profesores } = req.body;

    try {
        console.log(curso);
        const existe = await Curso.findById(curso);
        if (!existe) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el curso'
            });
        }

        //ids sabemos que son de mongo
        //pero sabemos que existen???
        let listaprofinsertar = [];
        if (profesores) {
            let listaprofbuscar = [];
            //map (como un forEach) para cada uno de los registros
            const listprof = profesores.map(registro => {
                //si existe un usuario
                if (registro.usuario) { //nos filtra aquellos registros con el campo usuario
                    listaprofbuscar.push(registro.usuario); //solo id
                    listaprofinsertar.push(registro); //todo registro
                }
            });

            const existenprofes = await Usuario.find().where('_id').in(listaprofbuscar);
            //busqueda de los profesores con los ids obtenidos en buscar y se guardan en existenprofes
            if (existenprofes.length != listaprofbuscar.length) { //si no es la misma longitud hay algo malo
                return res.status(400).json({
                    ok: false,
                    msg: 'Alguno de los profesores de la asignatura no existe o esta repetido'
                });
            }
        }

        const asignatura = new Asignatura(req.body);
        asignatura.profesores = listaprofinsertar;
        await asignatura.save();

        res.json({
            ok: true,
            msg: 'Asignatura creada',
            asignatura
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }

}

const modificarAsignatura = async(req, res) => {

    const uid = req.params.id;
    const { curso, profesores } = req.body;

    try {

        const existe = await Asignatura.findById(uid);

        if (!existe) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el asignatura'
            });
        }

        const existeC = await Curso.findById(curso);

        if (!existeC) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el curso'
            });
        }

        //ids sabemos que son de mongo
        //pero sabemos que existen???
        let listaprofinsertar = [];
        if (profesores) {
            let listaprofbuscar = [];
            //map (como un forEach) para cada uno de los registros
            const listprof = profesores.map(registro => {
                //si existe un usuario
                if (registro.usuario) { //nos filtra aquellos registros con el campo usuario
                    listaprofbuscar.push(registro.usuario); //solo id
                    listaprofinsertar.push(registro); //todo registro
                }
            });

            const existenprofes = await Usuario.find().where('_id').in(listaprofbuscar);
            //busqueda de los profesores con los ids obtenidos en buscar y se guardan en existenprofes
            if (existenprofes.length != listaprofbuscar.length) { //si no es la misma longitud hay algo malo
                return res.status(400).json({
                    ok: false,
                    msg: 'Alguno de los profesores de la asignatura no existe o esta repetido'
                });
            }
        }
        const object = req.body;
        object.profesores = listaprofinsertar;
        const asigna = await Asignatura.findByIdAndUpdate(uid, object, { new: true });

        res.json({
            ok: true,
            msg: 'Asignatura modificada',
            asigna
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const borrarAsignatura = async(req, res) => {

    const uid = req.params.id;

    try {

        const existe = await Asignatura.findById(uid);
        if (!existe) {
            return res.status(400).json({
                ok: false,
                msg: 'no existe dicho recurso'
            });
        }

        const borrado = await Asignatura.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Asignatura borrada correctamente',
            borrado
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }

}

module.exports = { getAsignaturas, crearAsignatura, modificarAsignatura, borrarAsignatura }