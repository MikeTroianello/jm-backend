const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  bonusChallenge: {
    type: String,
    // required: true,
  },
  minimumChallenge: {
    type: String,
    // required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: Number,
  },
  allOrNothing: {
    type: Boolean,
    default: false,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
