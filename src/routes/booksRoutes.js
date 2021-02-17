const booksRouter = require('express').Router()
const UserBooksSchema = require('../models/userBooksSchema')
const { openDbConnection, closeDbConnection } = require('../models/connection')
const bcrypt = require('bcrypt')
const userBooksSchema = require('../models/userBooksSchema')
const jwt = require('jsonwebtoken')

// LOGIN
booksRouter.post('/login', async (request, response) => {
  let user 
  const con = openDbConnection()
  try {
    const { username, password } = request.body
   
    const user = await userBooksSchema.findOne({username})
    console.log(user)

    

    if(user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
      if(isPasswordMatch){
        const token = jwt.sign(user.username, process.env.JWT_SECRET)
        response.status(200).json({token, username: user.username})
      }

      response.status(403).json({error: 'senha incorreta'})

    }  else {
      response.status(403).json({error: 'Usuario não encontrado'})
    }
  
  } catch (err) {
    response.status(500).json({error: err.message})
  
  } finally {
    //closeDbConnection(con)
  }
})

// ADICIONAR USUARIO
booksRouter.post('/adduser', async (request, response) => { 
  const con = openDbConnection()

  const user = new UserBooksSchema({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })

  try {
    // hash
    user.password = await bcrypt.hash(user.password, 10)

    const users = await user.save()
    response.status(201).json(users)

  } catch (err){
    response.status(400).json({message: err.message})

  } finally {
    //closeDbConnection(con)
  }
})

module.exports = booksRouter