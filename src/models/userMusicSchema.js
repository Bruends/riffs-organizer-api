const mongoose = require('mongoose')
require('mongoose-type-email')

const userMusicSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },

  musics: [
    {
      title: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
      },

      video: {
        type: String,
      },

      tab: {
        type: String,
      },

      category: {
        type: String,
        default: 'outros',
      },

      loops: [
        {
          title: { type: String },
          start: { type: Number },
          end: { type: Number },
        },
      ],
    },
  ],
})

module.exports = mongoose.model('UserMusics', userMusicSchema)
