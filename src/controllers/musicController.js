const { openDbConnection, closeDbConnection } = require('../models/connection')
const userMusicSchema = require('../models/userMusicSchema')
const consoleGroup = require('../utils/consolegroup')

const musicDatabase = async (username, response, changeMusicsCallback) => {
  try {
    openDbConnection()
    const user = await userMusicSchema.findOne({ username })

    //usuário não encontrado
    if (!user) {
      return response
        .status(403)
        .json({ auth: false, error: 'usuário não encontrado' })
    }

    // caso não tenha um callback de alteração de musicas
    if (!changeMusicsCallback) return user.musics

    // gera novo array apartir do callback
    const newMusics = changeMusicsCallback(user.musics)

    // remove valores nulos e salva
    user.musics = newMusics.filter((music) => music != null)
    await user.save()
    return { musics: user.musics }
  } catch (err) {
    return { error: err.message }
  } finally {
    closeDbConnection()
  }
}

const showAll = async (request, response) => {
  const { username } = request

  consoleGroup('all Musics Request', [username])

  const musics = await musicDatabase(username, response)

  if (!musics.error) return response.status(201).json(musics)

  return response.status(500).json(musics.error)
}

const addMusic = async (request, response) => {
  const { username } = request
  const { music } = request.body

  consoleGroup('add music request', [music])

  const addResponse = await musicDatabase(username, response, (userMusics) => {
    return [music, ...userMusics]
  })

  if (!addResponse.error) return response.status(201).json(addResponse)

  return response.status(500).json(addResponse)
}

const updateMusic = (request, response) => {
  const { username } = request
  const { music } = request.body
  const { _id } = music

  consoleGroup('update music request', [music])

  const updateResponse = musicDatabase(username, response, (userMusics) => {
    // caso a musica não seja encontrada
    const hasMusic = userMusics.some((music) => music.id === _id)
    if (!hasMusic) return userMusics

    newMusics = userMusics.filter((music) => music._id != _id)
    return [music, ...newMusics]
  })

  if (!updateResponse.error) response.status(200).json({})
  else response.status(500).json(updateResponse)
}

const deleteMusic = (request, response) => {
  const { username } = request
  const { _id } = request.body

  consoleGroup('del music request', [_id])

  const deleteResponse = musicDatabase(username, response, (userMusics) => {
    return userMusics.filter((music) => music._id != _id)
  })

  if (!deleteResponse.error) return response.status(200).json({})

  return response.status(500).json(deleteResponse)
}

module.exports = {
  showAll,
  addMusic,
  updateMusic,
  deleteMusic,
}
