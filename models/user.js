const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Nome: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('user', UserSchema)