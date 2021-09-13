const { openDbConnection, closeDbConnection } = require('../models/connection')
const userMusicSchema = require('../models/userMusicSchema')
const consoleGroup = require('../utils/consolegroup')

const musicDatabase = async (username, changeMusicsCallback) => {
  try {
    openDbConnection()
    const user = await userMusicSchema.findOne({ username })

    //usuário não encontrado
    if (!user) throw new Error('usuário não encontrado')

    // caso não tenha um callback de alteração de musicas
    if (!changeMusicsCallback) return user.musics

    // gera novo array apartir do callback
    const newMusics = changeMusicsCallback(user.musics)
    consoleGroup('Novas Músicas: ', [newMusics])

    // remove valores nulos e salva
    user.musics = newMusics.filter((music) => music != null)
    await user.save()
    return { musics: user.musics }
  } catch (err) {
    consoleGroup('erro', [err.message])
    return { error: err.message }
  } finally {
    closeDbConnection()
  }
}

// TODAS MUSICAS
const showAll = async (request, response) => {
  const { username } = request

  consoleGroup('all Musics Request', [username])

  const musics = await musicDatabase(username)

  if (!musics.error) return response.status(200).json(musics)

  return response.sendStatus(500)
}

//ADICIONAR MUSICA
const addMusic = async (request, response) => {
  const { username } = request
  const { music } = request.body

  consoleGroup('add music request', [music])

  const addResponse = await musicDatabase(username, (userMusics) => {
    return [music, ...userMusics]
  })

  if (!addResponse.error) return response.sendStatus(201)

  return response.sendStatus(500)
}

// ALTERAR MUSICA
const updateMusic = (request, response) => {
  const { username } = request
  const { music } = request.body
  const { _id } = music

  consoleGroup('update music request', [music])

  const updateResponse = musicDatabase(username, (userMusics) => {
    const newMusics = userMusics.map((userMusic) => {
      if (userMusic._id == _id) return { ...music, loops: userMusic.loops }

      return userMusic
    })
    return newMusics
  })

  if (!updateResponse.error) return response.sendStatus(200)
  else response.sendStatus(500)
}

//DELETAR MUSICA
const deleteMusic = (request, response) => {
  const { username } = request
  const { _id } = request.body

  consoleGroup('del music request', [_id])

  const deleteResponse = musicDatabase(username, (userMusics) => {
    return userMusics.filter((music) => music._id != _id)
  })

  if (!deleteResponse.error) return response.sendStatus(200)

  return response.status(500).json(deleteResponse)
}

// ATUALIZAR LOOPS
const updateLoops = (request, response) => {
  const { username } = request
  const { loops, _id } = request.body

  consoleGroup('update loops request', [loops])

  const updateResponse = musicDatabase(username, (userMusics) => {
    return userMusics.map((music) => {
      if (music._id == _id) music.loops = loops

      return music
    })
  })

  if (!updateResponse.error) response.sendStatus(200)
  else response.sendStatus(500)
}

module.exports = {
  showAll,
  addMusic,
  updateMusic,
  deleteMusic,
  updateLoops,
}
