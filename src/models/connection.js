const mongoose = require('mongoose')

 const openDbConnection = () => {
  mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected')
  )

  const connection = mongoose.connection

  connection.on('error', (error) => {
    console.log(error)
  })

  connection.once('open', () => console.log('connection open'))

  return connection
}

 const closeDbConnection = (connection) => {
  mongoose.connection.disconnect()
}

module.exports = {
  openDbConnection,
  closeDbConnection
}