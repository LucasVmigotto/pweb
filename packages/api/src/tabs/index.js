const fs = require('fs')
const path = require('path')

const readFile = filename =>
  fs.readFileSync(path.join(__dirname, filename),
    { encoding: 'utf8' })

module.exports = context => fs
  .readdirSync(__dirname)
  .filter(name => name !== 'index.js' && name.match(/\.js$/))
  .map(name => require(`./${name}`)({ ...context, readFile }))
