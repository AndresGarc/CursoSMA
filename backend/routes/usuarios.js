// archivo de declaracion de rutas para el recurso usuario
//RUTA BASE: /api/usuarios

const { Router } = require('express'); //pillamos la clase router de express que permite trabajar con rutas
const { getUsuarios, crearUsuarios, borrarUsuario, actualizarUsuario } = require('../controllers/usuarios'); //importar metodo getUsuarios
const { check } = require('express-validator'); //metodo check, comprobar existencias de campo, validaciones etc
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validarRol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router(); //creamos un objeto tipo router

//DECLARACION DE RUTAS
router.get('/', [
    validarJWT,
    check('id', 'El id tiene que ser valido').optional().isMongoId(),
    check('desde', 'El campo debe ser numérico').optional().isNumeric(),
    validarCampos
], getUsuarios); //indicamos a la ruta / a partir de /api/usuarios se atienda mediante la funcion getUsuarios.

//justo antes de llamar al manejador, validamos que existan los argumentos, esto no es logica de negocio, si no de seguridad, por ello se comprueba con la ruta
router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El argumento apellidos es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('password', 'El argumento psswd es obligatorio').not().isEmpty(),
    check('activo', 'el estado debe ser true/false').optional().isBoolean(),
    validarCampos,
    validarRol,
], crearUsuarios); //para comrpobar esto -> mirar controlador

router.put('/:id', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    check('apellidos', 'El argumento apellidos es obligatorio').not().isEmpty().trim(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('email', 'El email debe de ser un email').not().isEmail(),
    check('id', 'El id no es valido').isMongoId(),
    check('activo', 'El estado debe ser true/false').optional().isBoolean(),
    validarCampos,
    validarRol,
], actualizarUsuario);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id debe de ser valido').isMongoId(),
    validarCampos
], borrarUsuario);


module.exports = router; //exportamos objeto router para trabajar con el fuera de ese modulo