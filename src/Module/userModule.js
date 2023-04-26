var mongoose = require("mongoose")
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    min: 6,
    required: true
  },
  contact: {
    type: Number
  },
  profile: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, {
  timestamps: true
})




module.exports = mongoose.model('users', userSchema)