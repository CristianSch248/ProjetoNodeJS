const express = require("express")
const app = express()
const { randomUUID } = require("crypto")
const { request } = require("http")
const fs = require("fs")

app.use(express.json())

const produtos = []

app.post("/inserir", (req, res) => {
    const { nome, preco } = req.body
    
    const produto = {
        nome,
        preco,
        id: randomUUID(),
    }   
    produtos.push(produto)

    fs.writeFile("produtos.json", JSON.stringify(produtos), (err) => {
        if(err){
            console.log("🚀 ~ file: app.js:23 ~ fs.readFile ~ err:", err)
        } else {
            console.log("Produto inserido!!")
        }
    })

    return res.json(produto)
})

app.get("/get", (req, res) => {
    return res.json(produtos)
})

app.get("/get/:id", (req, res) => {
    
    const {id} = req.params

    const produto = produtos.find(produto => produto.id === id)
    
    return res.json(produto)
})

app.put("/alterar/:id", (req, res) => {
    
    const {id} = req.params

    const { nome, preco } = req.body

    const index = produtos.findIndex(produto => produto.id === id)

    produtos[index] = {
        ...produtos[index],
        nome,
        preco
    }
    
    return res.json("Produto alterado")
})

app.delete("/delete/:id", (req, res) => {
    
    const {id} = req.params

    produtos.splice(id, 1)
    
    return res.json(produtos)
})

app.listen(9090, () => console.log("Servidor rodando em -> localhost:9090"))