const booksRouter = require('express').Router()
const booksController = require('../controllers/booksController')

//GET ALL
booksRouter.get('/all', (request, response)=> {
    booksController.showAll(request, response)
})

//ADD
booksRouter.post('/add', async (request, response)=> {
  booksController.addBook(request, response)
})

//DELETE
booksRouter.delete('/delete', async ( request, response ) =>{
  booksController.deleteBook(request, response)
})

//alterar
booksRouter.patch('/update', async (request, response) => {
  booksController.updateBook(request, response)
})

module.exports = booksRouter