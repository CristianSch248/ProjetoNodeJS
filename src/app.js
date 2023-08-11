const express = require("express")
const routes = require('./routes');
const port = 9090
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json(), routes)

app.listen(9090, () => console.log(`Back-end de FAXWBOOK rodando em: http://localhost:${port}/`))