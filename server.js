const http = require("http")

http.createServer((req, res) =>{
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
        JSON.stringify(
            {
                data: 'Servidor Rodando!!!',
            }
        )
    )
}).listen(9090, () => console.log("Servidor rodando em -> localhost:9090"))