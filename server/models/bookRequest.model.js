const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookRequestSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
}, {
  timestamps: true,
});

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

module.exports = BookRequest;
