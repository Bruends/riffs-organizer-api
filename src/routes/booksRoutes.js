const booksRouter = require('express').Router()
const UserBooksSchema = require('../models/userBooksSchema')
const { openDbConnection, closeDbConnection } = require('../models/connection')
const bcrypt = require('bcrypt')

// get all
booksRouter.get('/', (request, response) => {
  response.send('hi XD')
})

booksRouter.post('/adduser', async (request, response) => { 
  const con = openDbConnection()

  const user = new UserBooksSchema({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })

  

  try {
    // hash
    user.password = await bcrypt.hash(user.password, 10)

    const users = await user.save()
    response.status(201).json(users)

  } catch (err){
    response.status(400).json({message: err.message})

  } finally {
    closeDbConnection(con)
  }
})

module.exports = booksRouter