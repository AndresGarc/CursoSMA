/*
    LOGICA DE LOGIN
*/
//imports
const Usuario = require('../models/usuario'); //objeto usuarios
const bcrypt = require('bcryptjs'); //libreria cifrado


const login = async(req, res) => {

    const { password, email } = req.body;
    //const asd = bcrypt.sa
    try {
        const usu = await Usuario.findOne({ email: email });
        if (!usu) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario o contraseña incorrectos',
                token: ''
            });
        }

        const validPass = bcrypt.compareSync(password, usu.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario o contraseña incorrectos',
                token: ''
            });
        }

        res.json({
            ok: true,
            msg: 'logeao bobo',
            token: 'token'
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'error'
        });
    }
}

module.exports = { login }