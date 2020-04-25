const connection = require('../database/connection'); // conxão com o banco de dados

module.exports = {

    async index(req, res) { 
        const { page = 1 } = req.query;// recebendo paramentro da url referente a pag

        const [count] = await connection('incidents').count();// total de casos existentes    

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); // fazendo consulta ao banco

        res.header('X-Total-Count', count['count(*)']); // retornado a quantidade de casos
    
        return res.json(incidents);// retornando como resposta os casos para listagem 
    },

    async create(req, res){
        const { title, description, value } = req.body; // dados recebidos do usuario
        const ong_id = req.headers.authorization; // validação de login para o acesso a criação de casos

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });// fazendo a inserção de dados no banco 

        return res.json({ id });// retornando o id do caso criado
    },

    async delete(req, res){
        const { id } = req.params; // id recebido pela url referenciando o caso q vai ser excluido
        const ong_id = req.headers.authorization; // validação de login para poder excluir um casos

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();  // fazendo consulta ao banco

        if (incident.ong_id != ong_id) {
            //erro caso eu informe um id de um caso errado
            return res.status(401).json({ error: 'Operation not permitted'}); 
        }

        await connection('incidents').where('id', id).delete(); // deletando do banco o caso

        return res.status(204).send(); // retornando sucesso na operação
    }
}