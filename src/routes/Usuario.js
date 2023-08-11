const express = require('express')
const routes = express.Router()
const ctrlUsuario = require('../controllers/Usuario')
const {verifyJWT} = require('../js/jwt')

routes.get('/listarUsuarios', verifyJWT, ctrlUsuario.listarUsuarios)
routes.post('/novoUsuario', ctrlUsuario.novoUsuario)
routes.put('/editarUsuario/:id', ctrlUsuario.alterarUsuario)
routes.patch('/alterarSenha', ctrlUsuario.alterarSenhaUsuario)
routes.delete('/deleteUsuario', ctrlUsuario.desativarUsuario)

routes.post('/login', ctrlUsuario.login)
routes.post('/logout', verifyJWT, ctrlUsuario.logout)

module.exports = routes