import { gql } from '../gql'

const MUTATION_USER_LOGIN = `
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
`

const MUTATION_USER_CREATE = `
  mutation ($input: UserInput!) {
    persistUser(input: $input) {
      userId
      name
      email
    }
  }
`
const MUTATION_USER_UPDATE = `
  mutation ($userId: ID, $input: UserInput!) {
    persistUser(userId: $userId, input: $input) {
      userId
      name
      email
    }
  }
`

export async function login ({ input }) {
  const { login } = await gql(MUTATION_USER_LOGIN, { input })
  return login
}

export async function create ({ input }) {
  const { persistUser } = await gql(MUTATION_USER_CREATE, { input })
  return persistUser
}

export async function update ({ userId, input }) {
  const { persistUser } = await gql(MUTATION_USER_UPDATE, { userId, input })
  return persistUser
}
