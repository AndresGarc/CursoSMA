/*
ARCHIVO CREADOR DE TOKEN
*/

const jwt = require('jsonwebtoken');

const generarToken = (uid, rol) => {

    //se crea en un objeto promesa el cual si ocurre algo, el try catch es capaz de recoger los datos del fallo
    //resolve -> todo bien -- reject -> todo mal
    //payload -> info
    //sign -> ??? para cifrar
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            rol
        }

        //sign - load - signal - propiedades del token - items a devolver
        jwt.sign(payload, process.env.JWTSIGN, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = { generarToken };