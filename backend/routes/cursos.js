// archivo de declaracion de rutas para el recurso usuario
//RUTA BASE: /api/usuarios

const { Router } = require('express'); //pillamos la clase router de express que permite trabajar con rutas
const { getCurso, crearCurso, actualizarCurso, borrarCurso } = require('../controllers/cursos'); //importar metodo getUsuarios
const { check } = require('express-validator'); //metodo check, comprobar existencias de campo, validaciones etc
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router(); //creamos un objeto tipo router

//DECLARACION DE RUTAS
router.get('/', [
    validarJWT,
    check('id', 'El id tiene que ser valido').optional().isMongoId(),
    check('desde', 'El campo debe ser numérico').optional().isNumeric(),
    validarCampos
], getCurso);


router.post('/', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty().trim(),
    check('nombrecorto', 'Nombre corto obligatorio').not().isEmpty().trim(),
    check('activo', 'Activo debe ser true/false').optional().isBoolean(),
    validarCampos
], crearCurso); //para comrpobar esto -> mirar controlador

router.put('/:id', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty().trim(),
    check('nombrecorto', 'Nombre corto obligatorio').not().isEmpty().trim(),
    check('activo', 'Activo debe ser true/false').optional().isBoolean(),
    check('id', 'Id debe ser valido').isMongoId(),
    validarCampos
], actualizarCurso);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id debe de ser valido').isMongoId(),
    validarCampos
], borrarCurso);


module.exports = router;