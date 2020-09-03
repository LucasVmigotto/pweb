const {
  expect,
  request,
  handleResponseError
} = require('../utils')
const config = require('../../src/config')
const createApp = require('../../src/app')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Models:Product', function () {
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
    let user = null
    it('users', async function () {
      const query = `
        query {
          users {
            count
            items {
              userId
              name
              email
            }
          }
        }
      `
      const {
        body: {
          data: {
            users: { count, items }
          }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query
        })
        .then(handleResponseError)
      user = { ...items[0] }
      expect(count).to.be.not.null
      expect(count).to.be.an('number')
      expect(items).to.be.not.null
      expect(items).to.be.an('array')
    })
    it('user', async function () {
      const query = `
        query ($userId: ID!) {
          user (userId: $userId) {
            userId
            name
            email
          }
        }
      `
      const {
        body: {
          data: { user: item }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            userId: user.userId
          }
        })
        .then(handleResponseError)
      expect(item).to.be.not.null
      expect(item).to.have.property('userId')
      expect(item).to.have.property('name')
      expect(item).to.have.property('email')
    })
  })
  describe('Mutations', function () {
    it('login', async function () {
      const body = {
        query: `
          mutation ($input: CredentialsInput!) {
            login(input: $input) {
              token
              user {
                userId
                name
                email
              }
            }
          }
        `,
        variables: {
          input: {
            email: 'admin@admin.com',
            password: 'rootroot'
          }
        }
      }
      const {
        body: { data: { login: { token, user } } }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)
      expect(token).to.be.not.null
      expect(user).to.be.not.null
      expect(user).to.be.haveOwnProperty('userId')
      expect(user).to.be.haveOwnProperty('name')
      expect(user).to.be.haveOwnProperty('email')
    })
    let user = null
    const body = {
      query: `
        mutation ($input: UserInput!) {
          persistUser(input: $input) {
            userId
            name
            email
          }
        }
      `,
      variables: {
        input: {
          name: 'User',
          email: `${new Date().getMilliseconds()}@email.com`,
          password: 'rootroot'
        }
      }
    }
    it('persistUser (create)', async function () {
      const {
        body: {
          data: { persistUser }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)
      user = { ...persistUser }
      expect(user).to.be.not.null
      expect(user).to.be.an('object')
      expect(user).to.have.property('userId')
      expect(user).to.have.property('name')
      expect(user).to.have.property('email')
    })
    it('persistUser (update)', async function () {
      const body = {
        query: `
          mutation ($userId: ID, $input: UserInput!) {
            persistUser(userId: $userId, input: $input) {
              userId
              name
              email
            }
          }
        `,
        variables: {
          userId: user.userId,
          input: {
            name: 'User CHANGED',
            email: 'CHANGED@mail.com',
            password: 'rootrootroot'
          }
        }
      }
      const {
        body: {
          data: { persistUser }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)
      expect(persistUser).to.be.not.null
      expect(persistUser).to.be.an('object')
      expect(persistUser).to.have.property('userId')
      expect(persistUser).to.have.property('name')
      expect(persistUser).to.have.property('email')
    })
    it('deleteUser', async function () {
      const query = `
        mutation ($userId: ID!) {
          deleteUser(userId: $userId)
        }
      `
      const {
        body: {
          data: { deleteUser }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            userId: user.userId
          }
        })
        .then(handleResponseError)
      expect(deleteUser).to.be.not.null
      expect(deleteUser).to.be.true
    })
  })
})
