const express = require("express")
const routes  = express.Router()

//ROTAS

rotaDeInicio = require('./routes/inicio')





routes.use(rotaDeInicio)





module.exports = routes;