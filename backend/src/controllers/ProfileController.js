const connection = require('../database/connection'); // conexão do banco

module.exports ={
    async index(req, res){
        // validação de login para o acesso aos casos da ong especifica
        const ong_id =req.headers.authorization; 

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*'); //consulta ao banco

        return res.json(incidents); // retorna a listagem de casos especificos de uma ong
    }
}