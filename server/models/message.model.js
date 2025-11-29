const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
