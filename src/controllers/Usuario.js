async function novoUsuario(req, res){
    console.log("Cadastrar novo usuário")
}

async function listarUsuarios(req, res){
    console.log("Listando usuários")
}

async function alterarUsuario(req, res){
    console.log("Alterando usuário")
}

async function alterarSenhaUsuario(req, res){
    console.log("Alterando Senha do usuário")
}

async function desativarUsuario(req, res){
    console.log("Desativando usuário")
}

module.exports = {
    novoUsuario,
    listarUsuarios,
    alterarUsuario,
    alterarSenhaUsuario,
    desativarUsuario
}