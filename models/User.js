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
  special: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  master: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  currentChallenge: { type: Schema.Types.ObjectId, ref: 'Challenge' },
  previousChallenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  time: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
