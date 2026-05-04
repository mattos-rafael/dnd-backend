require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")

const characterRoutes = require('./routes/character.routes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use('/api/character', characterRoutes)


module.exports = app