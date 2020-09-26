const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
