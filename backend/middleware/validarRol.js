const { response } = require('express');
const rolesPermitidos = ['ALUMNO', 'PROFESOR', 'ADMIN'];

//metodo que comprueba si tienes el rol permitido
const validarRol = (req, res = response, next) => {
    const rol = req.body.rol;
    /*  if (rol == "") {
          rol = "ALUMNO";
      }*/
    console.log(rol == true);
    console.log(!rolesPermitidos.includes(rol));
    if (rol && !rolesPermitidos.includes(rol)) {
        return res.status(400).json({
            ok: false,
            msg: 'Rol no permitido'
        });
    }
    next();
}

module.exports = { validarRol };