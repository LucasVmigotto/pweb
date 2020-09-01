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
      description: 'Não vai acrescentar em nada na sua vida, acredite...',
      price: 49.99
    })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('product')
}
