const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  challenges: [{ type: Schema.Types.type, ref: 'Challenge' }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
});

const ChallengeType = mongoose.model('ChallengeType', ChallengeTypeSchema);

module.exports = ChallengeType;
