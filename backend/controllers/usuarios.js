//aplica la logica de negocio

const getUsuarios = async() => {
    res.json({
        ok: true,
        msg: 'getUsuarios'
    });
}

module.exports = { getUsuarios };