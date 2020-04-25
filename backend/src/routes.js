const express = require('express');

//exportando controllers de rotas
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//rota para login da ong
routes.post('/sessions', SessionController.create);

//rotas para listar ongs exitentes e criação de uma
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//rota para listagem de casos especificos de uma ong 
routes.get('/profile', ProfileController.index);

//rotas para os casos: listar, crição e excluir 
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;