const express = require("express")
const routes  = express.Router()

//ROTAS
rotaUsuario = require('./routes/Usuario')




routes.use(rotaUsuario)





module.exports = routes;