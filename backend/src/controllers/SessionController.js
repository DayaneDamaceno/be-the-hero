const connection = require('../database/connection'); //conexão ao banco

module.exports ={
    async create(req, res){
        const { id } = req.body; // id recebido do usuario para efetuar o login

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); // consulta ao banco

        if (!ong) {
            // erro caso a ong n exita
            return res.status(400).json({ error: 'No ONG fould with this ID' });
        }

        return res.json(ong); // retorna a ong
    }
}