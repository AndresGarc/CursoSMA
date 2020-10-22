//rutas del recurso asignaturas

const { Router } = require('express'); //pillamos la clase router de express que permite trabajar con rutas
const { getAsignaturas, crearAsignatura, modificarAsignatura, borrarAsignatura } = require('../controllers/asignaturas'); //importar metodo getUsuarios
const { check } = require('express-validator'); //metodo check, comprobar existencias de campo, validaciones etc
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validarRol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    check('id', 'id no válido').optional().isMongoId(),
    check('desde', 'desde debe de ser un numero').optional().isNumeric(),
    validarCampos
], getAsignaturas);

router.post('/', [
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty().trim(),
    check('nombrecorto', 'nombre corto obligatorio').not().isEmpty().trim(),
    check('curso', 'curso no valido').isMongoId(),
    //checkear que la lista de profesores es valida
    //dentro de profesores cuyo nombre sea usuario que sean identificadores validos
    check('profesores.*.usuario', 'profesor no valido').optional().isMongoId(),
    validarCampos
], crearAsignatura);

router.put('/:id', [
    validarJWT,
    check('id', 'id no valido').isMongoId(),
    check('nombre', 'nombre obligatorio').not().isEmpty().trim(),
    check('nombrecorto', 'nombre corto obligatorio').not().isEmpty().trim(),
    check('curso', 'curso no valido').isMongoId(),
    //checkear que la lista de profesores es valida
    //dentro de profesores cuyo nombre sea usuario que sean identificadores validos
    check('profesores.*.usuario', 'profesor no valido').optional().isMongoId(),
    validarCampos
], modificarAsignatura);

router.delete('/:id', [
    validarJWT,
    check('id', 'id no valido').isMongoId(),
    validarCampos
], borrarAsignatura);

module.exports = router;