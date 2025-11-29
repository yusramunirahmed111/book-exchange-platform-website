const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookTitle: { type: String, required: true },
  author: { type: String },
}, {
  timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
