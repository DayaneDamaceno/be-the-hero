
exports.up = function(knex) {
  //criando tabela de ongs
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  //função callback caso de algum erro na crição da tabela
  return knex.schema.dropTable('ongs');
};
