const { createLogger } = require('./logger')
const { createKnex } = require('./knex')
const { createTransport } = require('./mail')

exports.createContext = config => {
  const logger = createLogger({ config })
  const knex = createKnex({ config, logger })
  const transport = createTransport({ config, logger })
  return { logger, knex, transport }
}
