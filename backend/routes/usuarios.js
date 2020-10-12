// archivo de declaracion de rutas para el recurso usuario
//RUTA BASE: /api/usuarios

const { Router } = require('express'); //pillamos la clase router de express que permite trabajar con rutas
const { getUsuarios, crearUsuarios } = require('../controllers/usuarios'); //importar metodo getUsuarios
const router = Router(); //creamos un objeto tipo router

//declaracion de rutas
router.get('/', getUsuarios); //indicamos a la ruta / a partir de /api/usuarios se atienda mediante la funcion getUsuarios.
router.post('/', crearUsuarios);

module.exports = router; //exportamos objeto router para trabajar con el fuera de ese modulo