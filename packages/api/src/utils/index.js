const config = require('../config')
const crypto = require('crypto')
const { camelizeKeys } = require('humps')
const { sign } = require('jsonwebtoken')
const { JWT_EXP } = require('../config')

const cipher = password => {
  const cipher = crypto.createCipheriv(
    config.CIPHER_ALGORITHM,
    crypto.scryptSync(password, config.CIPHER_SALT, 24),
    Buffer.alloc(16, 0))
  return cipher.update(password, 'utf8', 'hex') + cipher.final('hex')
}

const getClients = async (knex, lawyerId) => await knex('client')
  .select(
    'client_id',
    'name',
    'cpf',
    'email',
    'phone',
    'create_at',
    'update_at'
  )
  .where({ lawyer_id: lawyerId })

const getLawSuits = async (knex, clientId) =>
  await knex('law_suit')
    .select(
      'law_suit_id',
      'title',
      'description',
      'create_at',
      'update_at'
    )
    .where({ client_id: clientId })

const getAppointments = async (knex, id, identifier) =>
  await knex('appointment')
    .select(
      'appointment_id',
      'title',
      'description',
      'event_date',
      'create_at',
      'update_at'
    )
    .where(defineType(identifier, id))

const getUser = async (knex, lawyerId) =>
  await knex('user')
    .select(
      'user_id',
      'email'
    )
    .where({ lawyer_id: lawyerId })

const defineType = (identifier, id) => {
  if (identifier === 'LAWYER') {
    return { lawyer_id: id }
  }
  if (identifier === 'CLIENT') {
    return { client_id: id }
  }
  if (identifier === 'LAWSUIT') {
    return { law_suit_id: id }
  }
  throw new Error('Invalid option selected')
}

const promiseHandler = promise =>
  promise.then(res =>
    res.map(el => camelizeKeys(el)))

const signJWT = (
  data, key = config.JWT_SECRET, expiresIn = JWT_EXP
) => sign(data, key, { expiresIn })

const UserTypes = {
  ADMIN: 'ADMIN',
  LAWYER: 'LAWYER'
}

const userInRoles = (user, role = UserTypes.LAWYER) =>
  user.roles.includes(role) || user.roles.includes(UserTypes.ADMIN)

module.exports = {
  cipher,
  signJWT,
  UserTypes,
  userInRoles,
  defineType,
  promiseHandler,
  getClients,
  getLawSuits,
  getAppointments,
  getUser
}
