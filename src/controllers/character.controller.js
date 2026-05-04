const Character = require('../models/mongo/Character')

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find()

    res.status(200).json(characters)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const createCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body)

    res.status(201).json(newCharacter.id)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const deleteCharacter = async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id)

    res.status(201).json({message: 'Character deleted'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

module.exports = {
  getCharacters,
  createCharacter,
  deleteCharacter
}