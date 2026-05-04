const router = require('express').Router()
const {getUserCharacters, createUserCharacter, deleteUserCharacter} = require('../controllers/user.controller')
const {requireAuth} = require('../middleware/auth.middleware')

router.get('/', requireAuth, getUserCharacters)
router.post('/', requireAuth, createUserCharacter)
router.delete('/:id', deleteUserCharacter)