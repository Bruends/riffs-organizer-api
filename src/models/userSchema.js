const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({  
  username: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },

  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },

  books: [
    {
      title: {
        type: String,
        required: true
      },

      description: {
         type: String,
      },

      cover: {
        type: String
      },

      notes : {
        type: String
      },
      
      read: {
        type: Boolean,
        required: true,
        default: false
      }

    }
  ]
  
})

module.exports = userSchema