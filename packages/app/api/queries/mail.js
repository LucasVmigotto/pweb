import { gql } from '../gql'

const MUTATION_REMEMBER_PASSWORD = `
  mutation ($email: String!) {
    rememberPassword (email: $email) {
      to {
        email
      }
    }
  }
`

export async function remember (email) {
  const { rememberPassword } = await gql(MUTATION_REMEMBER_PASSWORD, { email })
  return rememberPassword
}
