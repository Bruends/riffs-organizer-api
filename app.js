const express = require('express')
const  booksRouter  = require('./routes/booksRoutes')


const app = express()
app.use(express.json())

app.use('/booksapi/json/', booksRouter)

const port = 3000
app.listen(port, () => {
  console.log('listen on port ' + port)
})