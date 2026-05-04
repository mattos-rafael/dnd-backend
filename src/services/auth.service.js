const jwt = require('jsonwebtoken')

const secret = process.env.ACCESS_TOKEN_SECRET

const createAccesToken = (user) => {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }, secret, {
    expiresIn: '60m'
  })
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, secret)
}

module.exports = {
  createAccesToken,
  verifyAccessToken
}