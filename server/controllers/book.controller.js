const Book = require('../models/book.model');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'username');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'username');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, genre, condition, location, imageUrl, bookUrl } = req.body;
  const owner = req.user.user_id;

  const newBook = new Book({
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
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.owner.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await book.remove();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
