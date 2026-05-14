require('dotenv').config()
const express = require('express')
const morgan =require('morgan')
const cookieParser = require("cookie-parser")
const cors = require('cors')
console.log(process.env.NODE_ENV)
const characterRoutes = require('./routes/character.routes')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express()
morgan.token('auth', (req) => req.headers['authorization'] || 'No Auth Header');
morgan.token('cookies', (req) => {
  // req.cookies is an object from cookie-parser
  return JSON.stringify(req.cookies);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :auth :cookies'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [FRONTEND_URL, "http://localhost:5173"],
  credentials: true
}))

// app.use(cors())

app.use('/api/character', characterRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


module.exports = app