async function gett(req, res){
    console.log("async function gett")
}

async function postt(req, res){
    console.log("async function postt")
}

async function putt(req, res){
    console.log("async function putt")
}

async function deletee(req, res){
    console.log("async function deletee")
}

module.exports = {
    gett,
    postt,
    putt,
    deletee
}