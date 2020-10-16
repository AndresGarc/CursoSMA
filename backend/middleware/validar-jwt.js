/*
    VALIDAR BUEN TOKEN
        EXTRAER EL TOKEN DE LA CABECERA
        VER LA FIRMA
        VER EL PAYLOAD
*/

const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //obtener token de la cabecera x-token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Falta token'
        });
    }

    //ver si firma bien
    try {
        const { uid, rol, ...object } = jwt.verify(token, process.env.JWTSIGN);
        req.uid = uid; //??los sacamos del token para que esten accesibles desde la request asi poder utilizarlos
        req.rol = rol; //??
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error con el token'
        });
    }
}

module.exports = { validarJWT }