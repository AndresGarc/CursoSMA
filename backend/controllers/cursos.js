//aplica la logica de negocio

//require de modelos de datos
const Curso = require('../models/cursos'); //objeto usuarios
const validator = require('validator');
const bcrypt = require('bcryptjs'); //libreria cifrado

const getCurso = async(req, res) => {

    //puedo recibir id o desde
    const desde = Number(req.query.desde) || 0;
    const regpp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    let total, cursos;

    try {

        if (id) {
            [cursos, total] = await Promise.all([
                Curso.findById(id),
                Curso.countDocuments()
            ]);

        } else {
            [cursos, total] = await Promise.all([
                Curso.find({}).skip(desde).limit(regpp),
                Curso.countDocuments()
            ]);
        }

        res.json({
            ok: true,
            msg: 'Cursos obtenidos correctamente',
            cursos,
            total
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }

}

const crearCurso = async(req, res) => {

    const { nombre, nombrecorto } = req.body;

    try {

        const curs = await Curso.findOne({ nombre });
        const curscorto = await Curso.findOne({ nombrecorto });
        if (curs) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre no permitido'
            });
        } else if (curscorto) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre corto no permitido'
            });
        }

        const curso = new Curso(req.body);
        await curso.save();

        res.json({
            ok: true,
            msg: 'curso creado correctamente',
            curso
        });

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

    const { nombre, nombrecorto } = req.body;
    const uid = req.params.id;

    try {

        //existe ese curso?
        const existe = await Curso.findById({ uid });
        if (!existe) {
            return res.json(400).json({
                ok: false,
                msg: 'no existe ningún recurso con ese id'
            });
        }

        const curs = await Curso.findOne({ nombre });
        const curscorto = await Curso.findOne({ nombrecorto });
        if (curs && (uid != curs._id)) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre no permitido'
            });
        } else if (curscorto && (uid != curs._id)) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre corto no permitido'
            });
        }

        const curso = await Curso.findByIdAndUpdate(uid, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Corso actualizado correctamente',
            curso
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error'
        });
    }
}

const borrarCurso = async(req, res) => {

    const uid = req.params.id;

    try {

        const existe = Curso.findById(uid);

        if (!existe) {
            return res.status(400).json({
                ok: false,
                msg: 'ID del curso no accesible'
            });
        }

        const borrado = await Curso.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Curso borrado correctamente',
            borrado
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error'
        });
    }
}

module.exports = { getCurso, crearCurso, actualizarCurso, borrarCurso };