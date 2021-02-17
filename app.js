const express = require('express')
const  booksRouter  = require('./src/routes/booksRoutes')
const bcrypt = require('bcrypt')

require('dotenv/config')

const app = express()
app.use(express.json())

app.use('/booksapi/', booksRouter)

const port = 3000
app.listen(port, () => {
  console.log('listen on port ' + port)  
})

