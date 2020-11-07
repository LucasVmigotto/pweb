module.exports = ({ endpoint, readFile }) => ({
  endpoint,
  name: 'Mail',
  query: readFile('./mail.gql')
})
