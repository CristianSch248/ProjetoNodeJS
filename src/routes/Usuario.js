const express = require('express')
const routes = express.Router()
const ctrlInicio = require('../controllers/Usuario')

routes.get('/get', ctrlInicio.listarUsuarios)
routes.post('/post', ctrlInicio.novoUsuario)
routes.put('/put', ctrlInicio.alterarUsuario)
routes.patch('/patch', ctrlInicio.alterarSenhaUsuario)
routes.delete('/delete', ctrlInicio.desativarUsuario)

module.exports = routes