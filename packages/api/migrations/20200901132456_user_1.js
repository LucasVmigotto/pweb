const { cipher } = require('../src/utils')

exports.up = async function (knex) {
  await knex.schema.createTable('user', t => {
    t.increments('user_id')
    t.string('name', 50).notNullable()
    t.string('email', 200).notNullable()
    t.string('password').notNullable()
    t.unique('email')
  })
  return knex('user')
    .insert({
      name: 'John Doe',
      email: 'admin@admin.com',
      password: cipher('rootroot')
    })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('user')
}
