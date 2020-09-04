exports.up = async function (knex) {
  await knex.schema.createTable('product', t => {
    t.increments('product_id')
    t.string('title', 50).notNullable()
    t.text('description').notNullable()
    t.decimal('price').notNullable()
  })
  return knex('product')
    .insert({
      title: 'Algo aleatório',
      description: 'Mais além do princípio de prazer, os processos oníricos — e, por extensão, todo o inconsciente — vela a enunciação que delimita o campo de intervenção do analista. Por outro lado, o inconsciente estruturado como linguagem opera não per via di porre, e sim per via di levare que delimita o campo de intervenção do analista ',
      price: 49.99
    })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('product')
}
