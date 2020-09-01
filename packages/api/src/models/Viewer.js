const { gql } = require('apollo-server-express')
const { tokenGraphQLResolver } = require('../security')

const typeDefs = gql`
  type Viewer

  extend type Query {
    viewer(token: String!): Viewer
  }
`

const resolvers = {
  Query: {
    viewer: tokenGraphQLResolver
  }
}

module.exports = {
  typeDefs,
  resolvers
}
