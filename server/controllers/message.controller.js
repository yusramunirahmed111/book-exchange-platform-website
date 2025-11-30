const Message = require('../models/message.model');
const User = require('../models/user.model');

const populate = (messages) => {
  const users = User.findAll();
  return messages.map(message => {
    const sender = users.find(u => u.id === message.sender);
    const receiver = users.find(u => u.id === message.receiver);
    return { ...message, sender: { _id: sender.id, username: sender.username }, receiver: { _id: receiver.id, username: receiver.username } };
  });
};

exports.getMessages = async (req, res) => {
  try {
    const { bookId, receiverId } = req.params;
    const senderId = req.user.user_id;

    const messages = Message.find({
      book: bookId,
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    res.status(200).json(populate(messages));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { receiverId, bookId, message } = req.body;
  const senderId = req.user.user_id;

  const newMessage = Message.create({
    sender: senderId,
    receiver: receiverId,
    book: bookId,
    message,
  });

  try {
    res.status(201).json(populate([newMessage])[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};