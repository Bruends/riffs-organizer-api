const express = require('express')
const  userRoutes  = require('./src/routes/userRoutes')
const  booksRoutes  = require('./src/routes/booksRoutes')
const verifyTokenAndGetUser = require('./src/middlewares/verifyTokenAndGetUser')

require('dotenv/config')

const app = express()
app.use(express.json())

app.use('/booksapi/user', userRoutes)
app.use('/booksapi/books', verifyTokenAndGetUser)
app.use('/booksapi/books', booksRoutes)

const port = 3000
app.listen(port, () => {
  console.log('listen on port ' + port)  
})

