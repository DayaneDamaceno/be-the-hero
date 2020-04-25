const crypto = require('crypto'); // criador de id criptografado
const connection = require('../database/connection'); //conexão com o banco

module.exports = {

    async index(req, res) { 
        const ongs = await connection('ongs').select('*'); // fazendo a consulta ao banco 
    
        return res.json(ongs) // retornando como resposta a listagem de ongs
    },

    async create(req, res){
        const { name, email, whatsapp, city, uf} = req.body; //dados recebidos do usuario
        const id = crypto.randomBytes(4).toString('HEX'); //criação do id

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });// fazendo a inserção de dados no banco 

        return res.json({ id }); // retornando o id para a ong fazer login
    }
}