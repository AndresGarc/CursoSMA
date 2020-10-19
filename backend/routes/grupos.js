// archivo de declaracion de rutas para el recurso usuario
//RUTA BASE: /api/usuarios

const { Router } = require('express'); //pillamos la clase router de express que permite trabajar con rutas
const { getGrupos, crearGrupo, modificarGrupo, borrarGrupo } = require('../controllers/grupos'); //importar metodo getUsuarios
const { check } = require('express-validator'); //metodo check, comprobar existencias de campo, validaciones etc
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validarRol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router(); //creamos un objeto tipo router

router.get('/', validarJWT, getGrupos);

router.post('/', [
    validarJWT,
    check('nombre', 'nombre del grupo requerido').not().isEmpty(),
    validarCampos,
], crearGrupo);

router.put('/:id', [
    validarJWT,
    check('nombre', 'nombre del grupo requerido').not().isEmpty(),
    check('id', 'identificador no valido').isMongoId(),
    validarCampos,
], modificarGrupo);

router.delete('/:id', [
    validarJWT,
    check('id', 'identificador no valido').isMongoId(),
    validarCampos,
], borrarGrupo);

module.exports = router; //exportamos objeto router para trabajar con el fuera de ese modulo