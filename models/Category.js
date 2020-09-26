const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
