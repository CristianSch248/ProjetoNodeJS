const express = require("express")
const routes = require('./routes');
let port = 9090

const app = express()

app.use(routes)

app.listen(9090, () => console.log(`Back-end de FAXWBOOK rodando em: http://localhost:${port}/`))