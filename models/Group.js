const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  whitelist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
