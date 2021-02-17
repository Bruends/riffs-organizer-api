const mongoose = require('mongoose')

 const openDbConnection = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  
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
  connection.disconnect()
}

module.exports = {
  openDbConnection,
  closeDbConnection
}