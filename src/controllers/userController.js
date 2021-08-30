const { openDbConnection, closeDbConnection } = require('../models/connection')
const UserMusicSchema = require('../models/userMusicSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// LOGIN
const login = async (request, response) => {
  let user
  try {
    openDbConnection()
    const { email, password } = request.body
    user = await UserMusicSchema.findOne({ email })

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)

      // verificando senha
      if (isPasswordMatch) {
        const token = jwt.sign(user.username, process.env.JWT_SECRET)
        return response.status(200).json({ token, username: user.username })
      }

      return response.status(403).json({ error: 'senha incorreta' })
    } else {
      response.status(403).json({ error: 'Usuario não encontrado' })
    }
  } catch (err) {
    response.status(500).json({ error: err.message })
  } finally {
    closeDbConnection()
  }
}

// ADICIONAR USUARIO
const addUser = async (request, response) => {
  const { username, email, password } = request.body

  try {
    const user = new UserMusicSchema({
      username,
      email,
      password,
    })

    openDbConnection()
    // hash
    user.password = await bcrypt.hash(user.password, 10)

    await user.save()
    response.status(201).json({})
  } catch (err) {
    response.status(500).json({ message: err.message })
  } finally {
    closeDbConnection()
  }
}

module.exports = {
  login,
  addUser,
}
