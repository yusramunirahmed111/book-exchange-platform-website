const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String },
  bookUrl: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Available' }, // Available, Reserved
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
