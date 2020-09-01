const config = require('./config')
const createApp = require('./app')

const {
  apolloServer,
  httpServer,
  logger
} = createApp(config)

const { PORT, HOST, ENDPOINT } = config

httpServer.listen({ port: PORT, host: HOST }, () => {
  logger.info(`Server ready at http://${HOST}:${PORT}${ENDPOINT}`)
})

httpServer.on('error', err => {
  logger.error(err)
  if (err.code === 'EADDRINUSE') {
    close()
  }
})

const close = async () => {
  if (close.closed) return
  close.closed = true
  logger.info('Server closing...')
  await apolloServer.stop()
  await new Promise(resolve => httpServer.close(resolve))
  logger.info('Server Closed')
  process.exit()
}

process.once('SIGINT', close)
process.once('SIGTERM', close)
