const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const commentCollectionSchema = new Schema({
  group: {
    type: Number,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  time: { type: Date, default: Date.now },
});

const CommentCollection = mongoose.model(
  'CommentCollection',
  commentCollectionSchema
);

module.exports = CommentCollection;
