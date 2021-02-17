const mongoose = require('mongoose')
require('mongoose-type-email')

const userBooksSchema = new mongoose.Schema ({  
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
  },

  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
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

      cover_path: {
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

module.exports = mongoose.model('UserBooks', userBooksSchema)