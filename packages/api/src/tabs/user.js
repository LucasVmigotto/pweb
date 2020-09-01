const config = require('../config')

module.exports = ({ endpoint, readFile }) => ({
  endpoint,
  name: 'User',
  query: readFile('./user.gql'),
  variables: `{
    "admin": "${config.PLAYGROUND_TOKEN_ADMIN}",
    "lawyer": "${config.PLAYGROUND_TOKEN_LAWYER}"
  }`
})
