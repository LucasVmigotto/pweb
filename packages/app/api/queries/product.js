import { gql } from '../gql'

const QUERY_LIST_PRODUCTS = `
  query ($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      count
      items {
        productId
        title
        description
        price
      }
    }
  }
`

const QUERY_LIST_PRODUCTS_BY_NAME = `
  query ($limit: Int, $offset: Int, $name: String) {
    products(limit: $limit, offset: $offset, name: $name) {
      count
      items {
        productId
        title
        description
        price
      }
    }
  }
`

const QUERY_GET_PRODUCT = `
  query ($productId: ID!) {
    product(productId: $productId) {
      productId
      title
      description
      price
    }
  }
`

const MUTATION_PRODUCT_CREATE = `
  query ($productId: ID!) {
    product(productId: $productId) {
      productId
      title
      description
      price
    }
  }
`

export async function list ({ limit = 4, offset = 0 }) {
  const { products } = await gql(
    QUERY_LIST_PRODUCTS, { limit, offset })
  return products
}

export async function listByName ({ limit = 4, offset = 0, name }) {
  const { products } = await gql(
    QUERY_LIST_PRODUCTS_BY_NAME, { limit, offset, name })
  return products
}

export async function get ({ productId }) {
  const { product } = await gql(
    QUERY_GET_PRODUCT, { productId })
  return product
}

export async function create ({ input }) {
  const { persistProduct } = await gql(
    MUTATION_PRODUCT_CREATE, { input })
  return persistProduct
}
