const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  lowerCaseUsername: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  time: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
