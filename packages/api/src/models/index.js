const fs = require('fs')
const path = require('path')
const { GraphQLDateTime } = require('graphql-iso-date')
const { gql } = require('apollo-server-express')
const { merge } = require('lodash')

const filename = path.basename(__filename)
const selfExclude = name => name !== filename
const relativeName = name => `./${name}`

const modules = fs.readdirSync(__dirname)
  .filter(selfExclude)
  .map(relativeName)
  .map(require)

const typeDefs = [
  gql`
    scalar DateTime
    type Query
    type Mutation
  `,
  ...modules
    .filter(m => m.typeDefs)
    .map(m => m.typeDefs)
]

const resolvers = merge(
  { DateTime: GraphQLDateTime },
  ...modules
    .filter(m => m.resolvers)
    .map(m => m.resolvers)
)

module.exports = {
  typeDefs,
  resolvers
}
