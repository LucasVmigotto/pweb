const { gql } = require('apollo-server-express')
const { camelizeKeys, decamelizeKeys } = require('humps')
const { cipher, signJWT } = require('../utils')

const typeDefs = gql`
  type User {
    userId: ID!
    name: String!
    email: String!
    password: String
  }

  type UserList {
    count: Int!
    items: [User]!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  type UserAuth {
    token: String!
    user: User!
  }

  extend type Query {
    user(userId: ID!): User!
    users(limit: Int, offset: Int): UserList!
  }

  extend type Mutation {
    login(input: CredentialsInput!): UserAuth!
    persistUser(userId: ID, input: UserInput!): User!
    deleteUser(userId: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    async user (_, { userId }, { knex }) {
      const [data] = await knex('user')
        .select(
          'user_id',
          'name',
          'email'
        )
        .where({ 'user.user_id': userId })
      return camelizeKeys(data)
    },
    async users (_, { limit = 100, offset = 0 }, { knex }) {
      const data = await knex('user')
        .select(
          'user_id',
          'name',
          'email'
        )
        .limit(limit)
        .offset(offset)
      const [{ count }] = await knex('user').count('user_id')
      return {
        count,
        items: data.map(el => {
          return camelizeKeys(el)
        })
      }
    }
  },
  Mutation: {
    async login (_, { input }, context) {
      const [res] = await context.knex('user')
        .select('user_id')
        .where({
          ...input,
          password: cipher(input.password)
        })
      if (!res) {
        throw new Error('Email or Password invalid')
      }
      const [data] = await context.knex('user')
        .select(
          'user_id',
          'name',
          'email'
        )
        .where({ 'user.user_id': res.user_id })
      const user = camelizeKeys(data)
      context.user = user
      return {
        token: signJWT(user),
        user
      }
    },
    async persistUser (_, { userId, input }, { knex }) {
      if (userId) {
        const [newUser] = await knex('user')
          .update(decamelizeKeys(input.password
            ? {
              ...input,
              password: cipher(input.password)
            }
            : { ...input }
          ))
          .where({ user_id: userId })
          .returning('*')
        return camelizeKeys(newUser)
      } else {
        const [newUser] = await knex('user')
          .insert(decamelizeKeys({
            ...input,
            password: cipher(input.password)
          }))
          .returning('*')
        return camelizeKeys(newUser)
      }
    },
    async deleteUser (_, { userId }, { knex }) {
      const data = await knex('user')
        .where({ user_id: userId })
        .del()
      return !!data
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
