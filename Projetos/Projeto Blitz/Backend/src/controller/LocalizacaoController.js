const Localizacao = require('../model/Localizacao');
const Usuario = require('../model/Usuario');
const Alerta = require('../model/Alerta');

const create = async(req, res) => {
    const data = req.body;
    const ret = await Localizacao.create(data)
    res.json(ret);
}


const read = async(req, res) => {
    let id = req.params.id
    filtro = {}
    let id_user = req.query.id_user

    if (id != undefined) filtro = { where: { id: id } }
    filtro.include = [
        { model: Usuario, attributes: { exclude: ['senha'] } },
        { model: Alerta }
    ]


    filtro.attributes = {
        exclude: ['id_user', 'id_alerta'],

    }

    if (id_user !== undefined) {
        filtro.include[0].where = { id: id_user }
    }

    const ret = await Localizacao.findAll(filtro);
    res.json(ret);

}

const update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    let ret = await Localizacao.update(data, {
        where: { id: id }
    })
    ret = await Localizacao.findAll({
        where: { id: id },

    })
    res.json(ret)

}
const del = async(req, res) => {
    const id = req.params.id;
    let ret = await Localizacao.destroy({
        where: { id: id }
    })
    if (ret == 1) {
        res.json({ id: id })
    } else {
        res.status(404).send("User not found")
    }
}

module.exports = {
    create,
    read,
    update,
    del
}