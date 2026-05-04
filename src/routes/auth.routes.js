const router = require('express').Router()
const {register, login, logout, changePassword} = require('../controllers/auth.controller')
const {requireAuth} = require('../middleware/auth.middleware')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.put('/changePassword', requireAuth, changePassword)

module.exports = router