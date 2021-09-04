const musicRouter = require('express').Router()
const musicController = require('../controllers/musicController')

// TODAS Musicas
musicRouter.get('/all', (request, response) => {
  musicController.showAll(request, response)
})

//ADICIONAR Musica
musicRouter.post('/add', async (request, response) => {
  musicController.addMusic(request, response)
})

//ALTERAR Musica
musicRouter.put('/update', async (request, response) => {
  musicController.updateMusic(request, response)
})

//DELETAR Musica
musicRouter.delete('/delete', async (request, response) => {
  musicController.deleteMusic(request, response)
})

//ALTERAR Loops
musicRouter.put('/loops', async (request, response) => {
  musicController.updateLoops(request, response)
})

module.exports = musicRouter
