const {
  expect,
  request,
  handleResponseError,
  generateToken
} = require('../utils')
const config = require('../../src/config')
const createApp = require('../../src/app')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Models:Product', function () {
  const token = generateToken(true)
  let knex, httpServer
  before(function () {
    const {
      knex: localKnex,
      httpServer: localHttpServer
    } = createApp(config)
    knex = localKnex
    httpServer = localHttpServer
  })
  after(async function () {
    await knex.destroy()
  })
  describe('Queries', function () {
    let product = null
    it('products', async function () {
      const query = `
        query ($token: String!) {
          viewer(token: $token) {
            products {
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
      const {
        body: {
          data: {
            viewer: { products: { count, items } }
          }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: { token }
        })
        .then(handleResponseError)
      product = { ...items[0] }
      expect(count).to.be.not.null
      expect(count).to.be.an('number')
      expect(items).to.be.not.null
      expect(items).to.be.an('array')
    })
    it('product', async function () {
      const query = `
        query ($productId: ID!, $token: String!) {
          viewer(token: $token) {
            product (productId: $productId) {
              productId
              title
              description
              price
            }
          }
        }
      `
      const {
        body: {
          data: { viewer: { product: item } }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            token,
            productId: product.productId
          }
        })
        .then(handleResponseError)
      expect(item).to.be.not.null
      expect(item).to.have.property('productId')
      expect(item).to.have.property('title')
      expect(item).to.have.property('description')
      expect(item).to.have.property('price')
    })
  })
  describe('Mutations', function () {
    let product = null
    const body = {
      query: `
        mutation ($input: ProductInput!, $token: String!) {
          authorization(token: $token) { userId }
          persistProduct(input: $input) {
            productId
            title
            description
            price
          }
        }
      `,
      variables: {
        token,
        input: {
          title: 'Product',
          description: 'A Sample product',
          price: 9.99
        }
      }
    }
    it('persistProduct (create)', async function () {
      const {
        body: {
          data: { persistProduct }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)
      product = { ...persistProduct }
      expect(product).to.be.not.null
      expect(product).to.be.an('object')
      expect(product).to.have.property('productId')
      expect(product).to.have.property('title')
      expect(product).to.have.property('description')
      expect(product).to.have.property('price')
    })
    it('persistProduct (update)', async function () {
      const body = {
        query: `
          mutation ($token: String!, $productId: ID, $input: ProductInput!) {
            authorization(token: $token) { userId }
            persistProduct(productId: $productId, input: $input) {
              productId
              title
              description
              price
            }
          }
        `,
        variables: {
          token,
          productId: product.productId,
          input: {
            title: 'Product CHANGED',
            description: 'Description CHANGED',
            price: 99.99
          }
        }
      }
      const {
        body: {
          data: { persistProduct }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .set('authorization', `Bearer ${token}`)
        .send(body)
        .then(handleResponseError)
      expect(persistProduct).to.be.not.null
      expect(persistProduct).to.be.an('object')
      expect(persistProduct).to.have.property('productId')
      expect(persistProduct).to.have.property('title')
      expect(persistProduct).to.have.property('description')
      expect(persistProduct).to.have.property('price')
    })
    it('deleteProduct', async function () {
      const query = `
        mutation ($token: String!, $productId: ID!) {
          authorization(token: $token) { userId }
          deleteProduct(productId: $productId)
        }
      `
      const {
        body: {
          data: { deleteProduct }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            token,
            productId: product.productId
          }
        })
        .then(handleResponseError)
      expect(deleteProduct).to.be.not.null
      expect(deleteProduct).to.be.true
    })
  })
})
