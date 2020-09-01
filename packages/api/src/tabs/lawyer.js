const config = require('../config')

module.exports = ({ endpoint, readFile }) => ({
  endpoint,
  name: 'Lawyer',
  query: readFile('./lawyer.gql'),
  variables: `{
    "admin": "${config.PLAYGROUND_TOKEN_ADMIN}",
    "lawyer": "${config.PLAYGROUND_TOKEN_LAWYER}"
  }`
})
