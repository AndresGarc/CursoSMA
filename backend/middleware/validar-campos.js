const { response } = require('express'); //importo response, el objeto
const { validationResult } = require('express-validator');

//funcion aplicada en justo antes de la llamada a la logica de negocio deseada
//que es next
//el response nos sirve para ver todas las funciones del res/ TIPAR el res
const validarCampos = (req, res = response, next) => {
    const erroresVal = validationResult(req);
    if (!erroresVal.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: erroresVal.mapped(),
            cosas: req.body
        });
    }
    next();
}

module.exports = { validarCampos };