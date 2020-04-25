const knex = require('knex'); // construtor de consultas para qualquer banco SQL
const configuration = require('../../knexfile'); // exportando configurações de acesso ao banco

//exportando configurações de acesso ao banco para desenvolvimento
const connection = knex(configuration.development); 

module.exports = connection;