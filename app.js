const express = require('express')
const  booksRouter  = require('./src/routes/booksRoutes')
require('dotenv/config')

const dbCon = require('./src/models/connection')

const app = express()
app.use(express.json())

app.use('/booksapi/json/', booksRouter)

dbCon();

const port = 3000
app.listen(port, () => {
  console.log('listen on port ' + port)  
})
