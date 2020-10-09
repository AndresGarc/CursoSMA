//declaracion de ruta para el recurso usuario

const { Router } = require('express'); //pillamos la clase router de express que hace...
const { getUsuarios } = require('../controllers/usuarios'); //importar metodo getUsuarios
const router = Router(); //creamos un objeto tipo router

router.get('/', getUsuarios); //indicamos a la ruta / a partir de /api/usuarios se atienda mediante la funcion getUsuarios
module.exports = router; //exportamos objeto router para trabajar con el fuera de ese modulo