const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  posts: [{ type: 'String', time: { type: Date, default: Date.now } }],
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
