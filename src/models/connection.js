const mongoose = require('mongoose')

const openCon = () => {
  mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected')
  )

  const db = mongoose.connection

  db.on('error', (error) => {
    console.log(error)
  })

  db.once('open', () => console.log('connection open'))
}

module.exports = openCon