const booksRouter = require('express').Router()

booksRouter.get('/', (request, response) => {
  response.send('hi XD')
})

module.exports = booksRouter