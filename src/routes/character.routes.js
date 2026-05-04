const router = require('express').Router()
const { getCharacters, createCharacter, deleteCharacter } = require('../controllers/character.controller')

router.get('/', getCharacters)
router.post('/', createCharacter)
router.delete('/:id', deleteCharacter)

module.exports = router