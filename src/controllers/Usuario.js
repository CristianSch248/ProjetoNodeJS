const sequelize = require("../connectionDB")
const ModelUsuario = require("../models/Usuario")
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const JTW = require('../js/jwt')

async function verifyUsers(nome, email){
    //verirficar se ja existe usuario com o mesmo nome ou com o memso email
}

async function novoUsuario(req, res){
    console.log("🚀 ~ file: Usuario.js:14 ~ novoUsuario ~ req:", req)

    let body = req.body
    let senhaCriptografada = null

    if (!body.nome) {
        console.log('Usuário não informado')
        return
    }

    if (!body.email) {
        console.log('E-mail não informado')
        return
    }

    if (!body.senha) {
        console.log('Senha não definida')
        return
    } else {
        senhaCriptografada = await bcrypt.hash(body.senha, 10)
    }

    const t = await sequelize.transaction()

    try{
        let novoUsuario = await ModelUsuario.create({
            nome: body.nome,
            email: body.email,
            senha: senhaCriptografada
        })
        await t.commit();
        return res.status(200).send('Usuário cadastrado com sucesso!')
    } catch (error){
        console.log("🚀 error:", error)
        console.log('Erro ao criar o usuario no banco')
        await t.rollback()
        return res.status(400).send('Erro ao criar o usuário')
    }
}

async function listarUsuarios(req, res){
    let usuarios = await ModelUsuario.findAll({
        raw: true,
        attributes: ['id', 'nome', 'email', 'senha'], 
    })
    return res.status(200).send(usuarios)
}

async function alterarUsuario(req, res){
    let id = req.params.id
    let body = req.body
    
    if (!id){
        console.log("Usuário não informado")
        return
    }

    const t = await sequelize.transaction()

    try{
        let Usuario = await ModelUsuario.findOne({
            where: {
                id: id
            }
        })
    
        if(body.nome){
            Usuario.nome = body.nome
        }
        if(body.email){
            Usuario.email = body.email
        }
        if(body.senha){
            Usuario.senha = await bcrypt.hash(body.senha, 10)
        }
    
        await Usuario.save({transaction: t})
        await t.commit()
        console.log('Usuario alterado com sucesso')
        return res.status(200).send('Usuário alterado com sucesso')
    } catch (error){
        console.log("🚀 error:", error)
        await t.rollback()
        return res.status(400).send('Erro ao editar o usuário')
    }
}

async function alterarSenhaUsuario(req, res){
    console.log("Alterando Senha do usuário")
}

async function desativarUsuario(req, res){
    console.log("Desativando usuário")
}

async function login(req, res){
    let body = req.body

    if(!body.email){
        return console.log('E-mail de usuário não informado.')
    }

    if(!body.senha){
        return console.log('Senha de login não informado.')
    }

    let user = await ModelUsuario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email : {
                [Op.eq]: body.email
            }  
        }
    })

    const match = await bcrypt.compare(body.senha, user.senha);

    if(match) {
        const token = JTW.newToken(user)
        return res.json({ auth: true, token })
    } else { 
        console.log('E-mail ou Senha incorretos.')
        res.status(401).end()
    }
}

async function logout(req, res){
    let Token = req.headers['x-access-token']
    const result = JTW.invalidToken(Token)
    
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
}

module.exports = {
    novoUsuario,
    listarUsuarios,
    alterarUsuario,
    alterarSenhaUsuario,
    desativarUsuario,
    login,
    logout
}