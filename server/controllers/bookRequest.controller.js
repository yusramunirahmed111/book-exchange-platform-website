const BookRequest = require('../models/bookRequest.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

const populate = (requests) => {
  const books = Book.findAll();
  const users = User.findAll();

  return requests.map(request => {
    const book = books.find(b => b.id === request.book);
    const owner = users.find(u => u.id === request.owner);
    const requester = users.find(u => u.id === request.requester);
    return { ...request, book, owner: { _id: owner.id, username: owner.username }, requester: { _id: requester.id, username: requester.username } };
  });
}

exports.createBookRequest = async (req, res) => {
  const { bookId } = req.body;
  const requester = req.user.user_id;

  try {
    const book = Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const owner = book.owner;

    const newBookRequest = BookRequest.create({
      book: bookId,
      owner,
      requester,
    });

    res.status(201).json(newBookRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReceivedBookRequests = async (req, res) => {
  try {
    const requests = BookRequest.find({ owner: req.user.user_id });
    res.status(200).json(populate(requests));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSentBookRequests = async (req, res) => {
  try {
    const requests = BookRequest.find({ requester: req.user.user_id });
    res.status(200).json(populate(requests));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookRequestStatus = async (req, res) => {
  const { status } = req.body; // status can be 'Approved' or 'Rejected'
  const { id } = req.params;

  try {
    const request = BookRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    if (status === 'Approved') {
      Book.findByIdAndUpdate(request.book, { status: 'Reserved' });
    }

    const updatedRequest = BookRequest.findByIdAndUpdate(id, { status });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};