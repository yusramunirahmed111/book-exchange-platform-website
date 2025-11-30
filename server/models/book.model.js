const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const booksPath = path.join(__dirname, '..', 'data', 'books.json');

class Book {
  constructor({ id, title, author, genre, condition, location, imageUrl, bookUrl, owner }) {
    this.id = id || uuidv4();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.condition = condition;
    this.location = location;
    this.imageUrl = imageUrl;
    this.bookUrl = bookUrl;
    this.owner = owner;
    this.status = 'Available';
  }

  static #readBooks() {
    try {
      const data = fs.readFileSync(booksPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static #writeBooks(books) {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2), 'utf8');
  }

  static findAll() {
    return this.#readBooks();
  }

  static findById(id) {
    const books = this.#readBooks();
    return books.find(book => book.id === id);
  }

  static create(bookData) {
    const books = this.#readBooks();
    const newBook = new Book(bookData);
    books.push(newBook);
    this.#writeBooks(books);
    return newBook;
  }

  static findByIdAndUpdate(id, updateData) {
    const books = this.#readBooks();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      return null;
    }
    const updatedBook = { ...books[bookIndex], ...updateData };
    books[bookIndex] = updatedBook;
    this.#writeBooks(books);
    return updatedBook;
  }

  static findByIdAndRemove(id) {
    const books = this.#readBooks();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      return null;
    }
    const removedBook = books.splice(bookIndex, 1);
    this.#writeBooks(books);
    return removedBook[0];
  }
}

module.exports = Book;