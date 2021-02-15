const express = require('express')
const  booksRouter  = require('./src/routes/booksRoutes')
require('dotenv/config')

const app = express()
app.use(express.json())

app.use('/booksapi/json/', booksRouter)

const port = 3000
app.listen(port, () => {
  console.log('listen on port ' + port)
  console.log(process.env.TEST)
})
