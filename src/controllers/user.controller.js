const CharacterList = require('../models/sql/CharacterList')
const Character = require('../models/mongo/Character')

const getUserCharacters = async (req, res) => {
  const userId = req.user.id
  try {
    const charactersList = await CharacterList.findAll({where: {user_id: userId}})

    const characters =  charactersList.forEach(async (character) => await Character.findById(character.character_id))

    res.status(200).json(characters)
  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}

const createUserCharacter = async (req, res) => {
  const {characterId} = req.body
  const userId = req.user.id

  try {
    await CharacterList.create({
      character_id: characterId,
      user_id: userId
    })

    res.status(201).json({message: "User character created successfully"})

  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}

const deleteUserCharacter = async (req, res) => {
  const characterId = req.params.id
  const userId = req.user.id

  try {
    await Character.findByIdAndDelete(characterId)
    await CharacterList.destroy({where: {character_id: characterId}})

    res.status(200).json({message: "Character deleted"})

  } catch (err) {
    res.status(500).json({message: `Server error: ${err.message}`})
  }
}

module.exports = {
  getUserCharacters,
  createUserCharacter,
  deleteUserCharacter
}