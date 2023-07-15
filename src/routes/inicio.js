const express = require('express')
const routes = express.Router()
const ctrlInicio = require('../controllers/Inicio')

routes.get('/get', ctrlInicio.gett)
routes.post('/post', ctrlInicio.postt)
routes.put('/put', ctrlInicio.putt)
routes.delete('/delete', ctrlInicio.deletee)

module.exports = routes