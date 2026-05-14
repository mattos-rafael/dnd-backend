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
    const existingUser = await User.findOne({where: {email}})
    if (existingUser) {
      return res.status(400).json({message: "Email already in use"})
    }

    const password_hash = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: password_hash,
      role: 'user'
    })

    res.status(201).json({message: `User ${newUser.name} created successfully`})

  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
  
}

const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(400).json({message: "Email and password required"})
  }

  try {
    const user = await User.findOne({where: {email}})

    if (!user) {
      return res.status(400).json({message: "Invalid email or password."})
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    const accessToken = createAccessToken(user)

    res.cookie("accessToken", accessToken, accessTokenCookieConfig)

    return res.status(200).json({token: accessToken})
  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}


const logout = ( req, res) => {
  res.clearCookie("accessToken", accessTokenCookieConfig);
  return res.status(200).json({message: "logged out"});
};

const changePassword = async (req, res) => {
  const email = req.user.email
  const {oldPassword, password, password2} = req.body

  try {
    const user = await User.findOne({where: {email}})

    const isValidPassword = await bcrypt.compare(oldPassword, user.password)
    if (!isValidPassword) {
      res.status(400).json({message: "password incorrect"})
    }

    if (password !== password2) {
      res.status(400).json({message: "passwords dosen't match"})
    }

    const password_hash = await bcrypt.hash(password, 10)

    await user.update({password: password_hash})

    return res.status(202).json({message: 'password changed'})
    
  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Database error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
  me

}