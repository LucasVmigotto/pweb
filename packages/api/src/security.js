const { verify } = require('jsonwebtoken')
const config = require('./config')

const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    verify(token, secret, (err, decodedToken) => {
      if (err) {
        reject(err)
      }
      resolve(decodedToken)
    })
  })

const tokenGraphQLResolver = async (_, args, context) => {
  const { user } = context
  if (args.token) {
    context.user = await verifyToken(args.token, config.JWT_SECRET)
  } else if (user) {
    context.user = user
  } else {
    throw new Error('Access Denied')
  }
  return context.user
}

const parseAuthorization = (auth) => {
  const [type, token] = auth.split(' ')
  if (type !== 'Bearer') {
    throw new Error('Unsupported authorization method')
  }
  return token
}

const tokenExpressResolver = (req, _, next) => {
  const { headers: { authorization } } = req
  if (authorization) {
    try {
      verifyToken(parseAuthorization(authorization), config.JWT_SECRET)
        .then((user) => {
          req.user = user
          next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  } else {
    next()
  }
}

const hasAuthorization = (
  user, message = 'Access denied'
) => {
  if (!user) {
    throw new Error(message)
  }
}

module.exports = {
  parseAuthorization,
  tokenGraphQLResolver,
  tokenExpressResolver,
  hasAuthorization
}
