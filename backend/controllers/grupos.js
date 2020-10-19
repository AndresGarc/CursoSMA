//aplica la logica de negocio

//require de modelos de datos
const Grupos = require('../models/grupos'); //objeto usuarios
const bcrypt = require('bcryptjs'); //libreria cifrado

const getGrupos = async(req, res) => {

    //PAGINACION
    const desde = Number(req.query.desde) || 0;
    const regxp = Number(process.env.DOCSPERPAGE)

    try {

        const [grups, total] = await Promise.all([
            Grupos.find({}).skip(desde).limit(regxp),
            Grupos.countDocuments()
        ]);

        res.json({
            ok: true,
            msg: 'obtenerGrupos',
            grupos: grups,
            page: {
                desde,
                regxp,
                total
            }
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }

}

const crearGrupo = async(req, res) => {

    const nombre = String(req.body.nombre).trim();

    try {
        const existe = await Grupos.findOne({ nombre: nombre });

        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un grupo'
            });
        }

        const grupo = new Grupos(req.body);
        grupo.nombre = nombre;
        await grupo.save();
        res.json({
            ok: true,
            msg: 'Grupo creado correctamente'
        });


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const modificarGrupo = async(req, res) => {

    const nombre = String(req.body.nombre).trim();
    const uid = req.params.id;
    const object = req.body;

    try {

        //ver si existe otro nombre igual en la bd y comprobar si mismo id
        if (nombre) {
            const existe = await Grupos.findOne({ nombre: nombre });
            if (existe) {
                if (uid != existe._id) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe grupo'
                    });
                }
            }
            object.nombre = nombre;
        }

        const grupo = await Grupos.findByIdAndUpdate(uid, object, { new: true });
        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            grupo
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}

const borrarGrupo = async(req, res) => {

    //Estaria bien si eres admin solo tu puedes borrar el grupo
    const uid = req.params.id;
    /*ESTO ES UNA PARA BORRAR UN GRUPO SI ERES ADMIN BRO
    if (req.rol === 'ADMIN' == false) {
        return res.status(400).json({
            ok: false,
            msg: 'A donde vas rufian'
        });
    } */

    try {

        const grupo = await Grupos.findById(uid);

        if (!grupo) {

            return res.status(400).json({
                ok: false,
                msg: 'No existe el grupo'
            });
        }

        //const resultado = await Grupos.findByIdAndRemove(uid);
        res.json({
            ok: true,
            msg: 'Grupo borrado satisfactoriamente',

        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error'
        });
    }
}


module.exports = { getGrupos, crearGrupo, modificarGrupo, borrarGrupo };