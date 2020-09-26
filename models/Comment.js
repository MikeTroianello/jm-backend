const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const commentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
