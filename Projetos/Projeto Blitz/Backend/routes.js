const Express = require('express');

const route = Express.Router();

const UsuarioController = require('./src/controller/UsuarioController')

route.get('/usuario', UsuarioController.read)
route.get('/usuario/:id', UsuarioController.read)

route.post('/usuario', UsuarioController.create)
route.put('/usuario/:id', UsuarioController.update)
route.delete('/usuario/:id', UsuarioController.del)

const AlertaController = require('./src/controller/AlertaController')

route.get('/alerta', AlertaController.read)
route.get('/alerta/:id', AlertaController.read)
route.post('/alerta', AlertaController.create)
route.put('/alerta/:id', AlertaController.update)
route.delete('/alerta/:id', AlertaController.del)

const LocalizacaoController = require('./src/controller/LocalizacaoController')

route.get('/local', LocalizacaoController.read)
route.get('/local/:id', LocalizacaoController.read)
route.post('/local', LocalizacaoController.create)
route.put('/local/:id', LocalizacaoController.update)
route.delete('/local/:id', LocalizacaoController.del)
route.post('/login', UsuarioController.login)

module.exports = route;