const Alerta = require('../model/Alerta')

const create = async(req, res) => {
    const data = req.body;

    const ret = await Alerta.create(data)

    res.json(ret);
}

const read = async(req, res) => {
    const id = req.params.id;

    let filtro = {};

    if (id != undefined) filtro = { where: { id: id } }
    const ret = await Alerta.findAll(filtro)
    res.json(ret)
}

const update = async(req, res) => {
    const id = req.params.id;

    const data = req.body

    let ret = await Alerta.update(data, { where: { id: id } })
    ret = Alerta.findAll({ where: { id: id } })
    res.json(ret)
}
const del = async(req, res) => {
    let id = req.params.id

    let ret = await Alerta.destroy({ where: { id: id } })

    if (ret == 1) {
        res.json({ id: id })
    } else {
        res.status(404).send("Alert not found")
    }
}



module.exports = {
    create,
    read,
    update,
    del
}