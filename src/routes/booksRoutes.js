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

booksRouter.post('/add', async (request, response)=> {
  const { username } = request
  const { book } = request.body

  try {
    openDbConnection()
    const user = await userBooksSchema.findOne({username}) 
    user.books.push(book)
    const save = await user.save()
    response.status(201).json(user.books)
    console.log(user)

  } catch(err) {
    response.status(500).json(err.message)
  }

  closeDbConnection()

  response.json(request.user)
})

module.exports = booksRouter