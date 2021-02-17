const booksRouter = require('express').Router()
const { openDbConnection, closeDbConnection } = require('../models/connection')
const userBooksSchema = require('../models/userBooksSchema')




booksRouter.get('/all', async (request, response)=> {
  const { username } = request
  openDbConnection()
  try {
    const user = await userBooksSchema.findOne({username}) 
    response.json(user.books)
    console.log(user)
  } catch(err) {
    response.status(500).json()
  }
  response.json(request.user)
})

module.exports = booksRouter