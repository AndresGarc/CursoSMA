//aplica la logica de negocio

const getUsuarios = async(req, res) => {
    res.json({
        ok: true,
        msg: 'getUsuarios'
    });
}

module.exports = { getUsuarios };