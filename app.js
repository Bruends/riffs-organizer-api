const express = require('express')
const userRoutes = require('./src/routes/userRoutes')
const musicRoutes = require('./src/routes/musicRoutes')
const verifyTokenAndGetUser = require('./src/middlewares/verifyTokenAndGetUser')
const cors = require('cors')

require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors('*'))

app.use('/musics/user', userRoutes)
app.use('/musics', verifyTokenAndGetUser)
app.use('/musics', musicRoutes)

const port = 3300
app.listen(port, () => {
  console.log('listen on port ' + port)
})
