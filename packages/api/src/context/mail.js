const nodemailer = require('nodemailer')

exports.createTransport = ({ config, logger }) => {
  const transport = nodemailer.createTransport({
    host: config.MAILHOG_HOST,
    port: '1025',
    auth: null
  })

  /* istanbul ignore next */
  transport.on('error', err => {
    logger.error(err.message)
  })

  /* istanbul ignore next */
  transport.on('idle', el => {
    logger.info(el)
  })

  return transport
}
