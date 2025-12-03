const Message = require('../models/message.model');

exports.getMessages = async (req, res) => {
  try {
    const { bookId, receiverId } = req.params;
    const senderId = req.user.user_id;

    const messages = await Message.find({
      book: bookId,
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).populate('sender', 'username').populate('receiver', 'username');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { receiverId, bookId, message } = req.body;
  const senderId = req.user.user_id;

  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    book: bookId,
    message,
  });

  try {
    const savedMessage = await newMessage.save();
    const populatedMessage = await savedMessage.populate('sender', 'username');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};