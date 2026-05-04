const bcrypt = require('bcryptjs')
const {createAccessToken} = require('../services/auth.service')
const accessTokenCookieConfig = require('../config/cookie.config')
const User = require('../models/sql/User')

const register = async (req, res) => {
  const {email, name, password, password2} = req.body
  if (!email || !name || !password) {
    return res.status(400).json({message: "Email, name and password required"})
  }

  if (password !== password2) {
    return res.status(400).json({message: "Password dosen't match"})
  }

  try {
    const existingUser = User.findOne({where: {email}})
    if (existingUser) {
      return res.status(400).json({message: "Email already in use"})
    }

    const password_hash = await bcrypt.hash(password, 10)

    const newUser = User.create({
      name,
      email,
      password: password_hash,
      role: 'user'
    })

    res.status(201).json({message: `User ${newUser.name} created successfully`})

  } catch (err) {
    res.status(500).json({message: `Error connecting to server: ${err.message}`})
  }
  
}

const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(400).json({message: "Email and password required"})
  }

  try {
    const user = User.findOne({where: {email}})

    if (!user) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    const accessToken = createAccessToken(user)

    res.cookie("accessToken", accessTokenCookieConfig)

    return res.status(200).json(accessToken)
  } catch (err) {
    res.status(500).json({message: `Error connecting to server: ${err.message}`})
  }
}


// try {

// } catch (err) {
//   res.status(500).json({message: `Error connecting to server: ${err.message}`})
// }
module.exports = {
  register,
}