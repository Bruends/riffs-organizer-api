const userRouter = require('express').Router()
const userController = require('../controllers/userController')

// LOGIN
userRouter.post('/login', async (request, response) => {
  userController.login(request, response)
})

// ADICIONAR USUARIO
userRouter.post('/adduser', async (request, response) => { 
  userController.addUser(request, response)
})

module.exports = userRouter