const { openDbConnection, closeDbConnection } = require('../models/connection')
const UserMusicSchema = require('../models/userMusicSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// LOGIN
const login = async (request, response) => {
  try {
    const { username, password } = request.body
    if (!username || !password) return response.sendStatus(400)

    openDbConnection()
    const user = await UserMusicSchema.findOne({ username })

    // verificando usuário
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)

      // verificando senha
      if (isPasswordMatch) {
        const token = jwt.sign(user.username, process.env.JWT_SECRET)
        return response.status(200).json({ token, username: user.username })
      }

      return response.status(400).json({ error: 'Senha incorreta' })
    }

    return response.status(400).json({ error: 'Usuário não encontrado' })
  } catch (err) {
    return response.sendStatus(500)
  } finally {
    closeDbConnection()
  }
}

// ADICIONAR USUARIO
const addUser = async (request, response) => {
  const { username, email, password } = request.body
  if (!username || !email || !password) return response.sendStatus(400)

  try {
    openDbConnection()
    // email já cadastrado
    const foundUserEmail = await UserMusicSchema.findOne({ email })
    if (foundUserEmail)
      return response.status(400).json({ error: 'Email já cadastrado' })

    // username já cadastrado
    const foundUsername = await UserMusicSchema.findOne({ username })
    if (foundUsername)
      return response
        .status(400)
        .json({ error: 'Nome de usuário indisponível' })

    // criando novo usuário
    const user = new UserMusicSchema({
      username,
      email,
      password,
    })

    // encryptando senha
    user.password = await bcrypt.hash(user.password, 10)

    //salvando usuário no db
    await user.save()
    return response.sendStatus(201)
  } catch (err) {
    return response.sendStatus(500)
  } finally {
    closeDbConnection()
  }
}

module.exports = {
  login,
  addUser,
}
