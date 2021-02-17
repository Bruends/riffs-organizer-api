const booksRouter = require('express').Router()
const { openDbConnection, closeDbConnection } = require('../models/connection')
const userBooksSchema = require('../models/userBooksSchema')
const jwt = require('jsonwebtoken')



booksRouter.get('/all', async (request, response)=> {
  response.json(request.user)
})

module.exports = booksRouter