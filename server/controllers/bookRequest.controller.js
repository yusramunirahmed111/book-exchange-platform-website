const BookRequest = require('../models/bookRequest.model');
const Book = require('../models/book.model');

exports.createBookRequest = async (req, res) => {
  const { bookId } = req.body;
  const requester = req.user.user_id;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const owner = book.owner;

    const newBookRequest = new BookRequest({
      book: bookId,
      owner,
      requester,
    });

    const savedBookRequest = await newBookRequest.save();
    res.status(201).json(savedBookRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReceivedBookRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find({ owner: req.user.user_id }).populate('book').populate('requester', 'username');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSentBookRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find({ requester: req.user.user_id }).populate('book').populate('owner', 'username');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookRequestStatus = async (req, res) => {
  const { status } = req.body; // status can be 'Approved' or 'Rejected'
  const { id } = req.params;

  try {
    const request = await BookRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    request.status = status;

    if (status === 'Approved') {
      const book = await Book.findById(request.book);
      book.status = 'Reserved';
      await book.save();
    }

    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
