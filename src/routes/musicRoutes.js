const musicRouter = require('express').Router()
const musicController = require('../controllers/musicController')

// TODOS
musicRouter.get('/all', (request, response) => {
  musicController.showAll(request, response)
})

//ADICIONAR
musicRouter.post('/add', async (request, response) => {
  musicController.addMusic(request, response)
})

//ALTERAR
musicRouter.put('/update', async (request, response) => {
  musicController.updateMusic(request, response)
})

//DELETAR
musicRouter.delete('/delete', async (request, response) => {
  musicController.deleteMusic(request, response)
})

module.exports = musicRouter
