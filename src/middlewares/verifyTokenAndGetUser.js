const jwt = require('jsonwebtoken')

function verifyTokenAndGetUser(request, response, next){
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if(token == null) return response.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return response.status(403).send(err)

    request.user = user

    next()
  })
}

module.exports = verifyTokenAndGetUser