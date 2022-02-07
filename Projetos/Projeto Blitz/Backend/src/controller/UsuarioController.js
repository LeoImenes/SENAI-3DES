const Usuario = require('../model/Usuario');

const create = async(req, res) => {
    const data = req.body;
    let ret = [];
    try {
        ret = await Usuario.create(data);
        delete ret.dataValues.senha
    } catch (err) {
        ret = { msg: err.errors[0].message };
    }
    res.json(ret)
}
const read = async(req, res) => {
    let id = req.params.id
    filtro = {}
    if (id != undefined) filtro = { where: { id: id } }
    const ret = await Usuario.findAll(filtro);
    res.json(ret);

}

const update = async(req, res) => {
    console.log("oi")
    const id = req.params.id;
    const data = req.body;
    let ret = await Usuario.update(data, {
        where: { id: id }
    })
    ret = await Usuario.findAll({
        attributes: {
            exclude: ["senha"]
        },
        where: { id: id }
    })
    res.json(ret)

}
const del = async(req, res) => {
    const id = req.params.id;
    let ret = await Usuario.destroy({
        where: { id: id }
    })
    if (ret == 1) {
        res.json({ id: id })
    } else {
        res.status(404).send("User not found")
    }
}
const login = async(req, res) => {
    const data = req.body
    const ret = await Usuario.findAll({
        attributes: {
            exclude: ["senha"]
        },
        where: {
            email: data.email,
            senha: data.senha
        }
    })
    console.log(ret)
    res.json(ret)
}

module.exports = {
    create,
    read,
    update,
    del,
    login,
}