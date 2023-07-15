const express = require("express")
const routes = require('./routes');
let port = 9090

const app = express()

app.use(routes)

app.listen(9090, () => console.log("Servidor rodando em -> localhost:9090"))