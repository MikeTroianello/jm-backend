const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  challenges: {
    type: Array,
    default: [],
  },
  time: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
