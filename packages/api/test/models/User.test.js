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
    let user = null
    it('users', async function () {
      const query = `
        query ($token: String!) {
          viewer(token: $token) {
            users {
              count
              items {
                userId
                name
                email
              }
            }
          }
        }
      `
      const {
        body: {
          data: {
            viewer: { users: { count, items } }
          }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: { token }
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
        query ($userId: ID!, $token: String!) {
          viewer(token: $token) {
            user (userId: $userId) {
              userId
              name
              email
            }
          }
        }
      `
      const {
        body: {
          data: { viewer: { user: item } }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            token,
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
    describe('authorization', () => {
      const body = valid => ({
        query: `
          mutation ($token: String!){
            authorization(token: $token) {
              userId
              name
              email
            }
          }
        `,
        variables: {
          token: generateToken(valid)
        }
      })
      it('authorization', async function () {
        const {
          body: { data: { authorization } }
        } = await request(httpServer)
          .post(config.ENDPOINT)
          .send(body(true))
          .then(handleResponseError)
        expect(authorization).to.be.not.null
        expect(authorization).to.haveOwnProperty('userId')
        expect(authorization).to.haveOwnProperty('name')
        expect(authorization).to.haveOwnProperty('email')
      })
      it('authorization - fail', async function () {
        const { body: { errors: [{ message }] } } = await request(httpServer)
          .post(config.ENDPOINT)
          .send(body(false))
        expect(message).to.be.not.null
        expect(message).to.match(/invalid signature/)
      })
    })
    let user = null
    const body = {
      query: `
        mutation ($input: UserInput!, $token: String!) {
          authorization(token: $token) { userId }
          persistUser(input: $input) {
            userId
            name
            email
          }
        }
      `,
      variables: {
        token,
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
          mutation ($token: String!, $userId: ID, $input: UserInput!) {
            authorization(token: $token) { userId }
            persistUser(userId: $userId, input: $input) {
              userId
              name
              email
            }
          }
        `,
        variables: {
          token,
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
        .set('authorization', `Bearer ${token}`)
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
        mutation ($token: String!, $userId: ID!) {
          authorization(token: $token) { userId }
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
            token,
            userId: user.userId
          }
        })
        .then(handleResponseError)
      expect(deleteUser).to.be.not.null
      expect(deleteUser).to.be.true
    })
  })
})
