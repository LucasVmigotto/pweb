module.exports = config => {
  const http = require('http')
  const express = require('express')
  const cors = require('cors')
  const { ApolloServer } = require('apollo-server-express')
  const { GraphQLError } = require('graphql')
  const { createContext } = require('./context')
  const { tokenExpressResolver } = require('./security')

  const app = express()

  const endpoint = config.ENDPOINT

  const { typeDefs, resolvers } = require('./models')

  const { logger, knex } = createContext(config)

  app.use(cors())

  /* istanbul ignore next */
  const formatError = config.NODE_ENV !== 'test'
    ? err => {
      if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
        logger.error(err)
        return new GraphQLError(
          'Unexpected Error: ' + err.message,
          err.nodes,
          err.source,
          err.positions,
          err.path,
          null,
          { code: 'INTENAL_SERVER_ERROR' }
        )
      }
      return err
    }
    : null

  const playground = {
    tabs: require('./tabs')({ endpoint })
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    playground,
    tracing: true,
    context: { logger, knex },
    debug: config.APOLLO_SERVER_DEBUG
  })

  app.use(tokenExpressResolver)

  apolloServer.applyMiddleware({ app, path: endpoint })

  const httpServer = http.createServer(app)

  return { app, apolloServer, httpServer, knex, logger }
}
