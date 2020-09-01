const { gql } = require('apollo-server-express')
const { camelizeKeys, decamelizeKeys } = require('humps')
const { hasAuthorization } = require('../security')

const typeDefs = gql`
  type Product {
    productId: ID!
    title: String!
    description: String!
    price: Float!
  }

  type ProductList {
    count: Int!
    items: [Product]!
  }

  input ProductInput {
    title: String!
    description: String!
    price: Float
  }

  extend type Viewer {
    product(productId: ID!): Product!
    products(limit: Int, offset: Int): ProductList!
  }

  extend type Mutation {
    persistProduct(productId: ID, input: ProductInput!): Product!
    deleteProduct(productId: ID!): Boolean
  }
`

const resolvers = {
  Viewer: {
    async product (_, { productId }, { knex }) {
      const [data] = await knex('product')
        .select(
          'product_id',
          'title',
          'description',
          'price'
        )
        .where({ 'product.product_id': productId })
      return camelizeKeys(data)
    },
    async products (_, { limit = 100, offset = 0 }, { knex }) {
      const data = await knex('product')
        .select(
          'product_id',
          'title',
          'description',
          'price'
        )
        .limit(limit)
        .offset(offset)
      const [{ count }] = await knex('product').count('product_id')
      return {
        count,
        items: data.map(el => {
          return camelizeKeys(el)
        })
      }
    }
  },
  Mutation: {
    async persistProduct (_, { productId, input }, { knex, user }) {
      hasAuthorization(user)
      if (productId) {
        const [newProduct] = await knex('product')
          .update(decamelizeKeys({ ...input }))
          .where({ product_id: productId })
          .returning('*')
        return camelizeKeys(newProduct)
      } else {
        const [newProduct] = await knex('product')
          .insert(decamelizeKeys({ ...input }))
          .returning('*')
        return camelizeKeys(newProduct)
      }
    },
    async deleteProduct (_, { productId }, { knex, user }) {
      hasAuthorization(user)
      const data = await knex('product')
        .where({ product_id: productId })
        .del()
      return !!data
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
