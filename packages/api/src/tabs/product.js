module.exports = ({ endpoint, readFile }) => ({
  endpoint,
  name: 'Product',
  query: readFile('./product.gql')
})
