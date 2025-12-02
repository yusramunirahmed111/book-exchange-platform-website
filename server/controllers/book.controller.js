const Book = require('../models/book.model');
const User = require('../models/user.model');

const populate = (books) => {
  const users = User.findAll();
  return books.map(book => {
    const owner = users.find(user => user.id === book.owner);
    return { ...book, owner: { _id: owner.id, username: owner.username } };
  });
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = Book.findAll();
    res.status(200).json(populate(books));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(populate([book])[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, genre, condition, location, bookUrl } = req.body;
  const owner = req.user.user_id;
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;

  const newBook = Book.create({
    title,
    author,
    genre,
    condition,
    location,
    imageUrl,
    bookUrl,
    owner,
  });

  try {
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedBook = Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    Book.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};