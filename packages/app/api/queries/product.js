import { gql } from '../gql'

const QUERY_LIST_PRODUCTS = token => `
  query ($limit: Int, $offset: Int) {
    viewer(token: "${token}") {
      products(limit: $limti, offset: $offset) {
        count
        items {
          productId
          title
          description
          price
        }
      }
    }
  }
`

const QUERY_GET_PRODUCT = token => `
  query ($productId: ID!) {
    viewer(token: "${token}") {
      product(productId: $productId) {
        productId
        title
        description
        price
      }
    }
  }
`

const MUTATION_PRODUCT_CREATE = token => `
  query ($productId: ID!) {
    viewer(token: "${token}") {
      product(productId: $productId) {
        productId
        title
        description
        price
      }
    }
  }
`

export async function list ({ token, limit = 4, offset = 0 }) {
  const { products } = await gql(
    QUERY_LIST_PRODUCTS(token), { limit, offset })
  return products
}

export async function get ({ token, lawSuitId }) {
  const { product } = await gql(
    QUERY_GET_PRODUCT(token), { lawSuitId })
  return product
}

export async function create ({ token, input }) {
  const { persistProduct } = await gql(
    MUTATION_PRODUCT_CREATE(token), { input })
  return persistProduct
}
