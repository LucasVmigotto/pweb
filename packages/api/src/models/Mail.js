const { gql } = require('apollo-server-express')
const { mountAddress } = require('../utils')
const { mailRememberPassword } = require('../template/mail')
const { camelizeKeys } = require('humps')

const typeDefs = gql`
  type UserAddress {
    name: String!
    email: String!
  }
  input UserAddressInput {
    name: String!
    email: String!
  }
  type Mail {
    from: UserAddress!
    to: UserAddress!
    subject: String!
    message: String!
  }
  extend type Mutation {
    rememberPassword(email: String!): Mail
  }
`

const resolvers = {
  Mutation: {
    async rememberPassword (_, { email }, { knex, transport }) {
      const [data] = await knex('user')
        .select(
          'name as client_name',
          'email as client_email',
          'password as client_psw'
        )
        .where({ email })

      const {
        clientName,
        clientEmail,
        clientPsw
      } = camelizeKeys(data)

      const subject = `${clientName} - Lembrete de senha`
      const html = mailRememberPassword(clientPsw)

      transport.sendMail({
        from: mountAddress({
          name: 'PWEB Store',
          email: 'no-reply@pwebstore.com'
        }),
        to: mountAddress({
          name: clientName,
          email: clientEmail
        }),
        subject,
        html
      })

      return {
        from: {
          name: 'PWEB Store',
          email: 'no-reply@pwebstore.com'
        },
        to: {
          name: clientName,
          email: clientEmail
        },
        subject,
        message: html
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
