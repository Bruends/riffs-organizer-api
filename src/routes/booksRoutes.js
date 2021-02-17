const booksRouter = require('express').Router()
const UserBooksSchema = require('../models/userBooksSchema')
const { openDbConnection, closeDbConnection } = require('../models/connection')

// get all
booksRouter.get('/', (request, response) => {
  response.send('hi XD')
})

booksRouter.post('/addUser', async (request, response) => { 
  const con = openDbConnection()

  const user = new UserBooksSchema({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })

  try {
    const users = await user.save()
    response.status(201).json(subs)

  } catch (err){
    response.status(400).json({message: err.message})

  } finally {
    closeDbConnection(con)
  }
})

module.exports = booksRouter