/*
    MANEJADOR DE RUTAS PARA EL LOGIN
    /api/login
*/

//imports
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator'); //metodo check, comprobar existencias de campo, validaciones etc
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'el email es necesario').not().isEmpty(),
    check('password', 'el pwd es necesario').not().isEmpty(),
    validarCampos
], login);


module.exports = router;