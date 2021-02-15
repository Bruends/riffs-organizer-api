const booksRouter = require('express').Router()

// get all
booksRouter.get('/', (request, response) => {
  response.send('hi XD')
})

module.exports = booksRouter