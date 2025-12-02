const mongoose = require('mongoose');
const Book = require('../models/book.model');
const User = require('../models/user.model');
require('dotenv').config({ path: '../.env' });

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    condition: 'Used',
    location: 'New York, NY',
    imageUrl: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    bookUrl: 'https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    condition: 'New',
    location: 'Los Angeles, CA',
    imageUrl: 'https://m.media-amazon.com/images/I/81a4kCNuH+L._AC_UF1000,1000_QL80_.jpg',
    bookUrl: 'https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0061120081',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    condition: 'Like New',
    location: 'Chicago, IL',
    imageUrl: 'https://m.media-amazon.com/images/I/71k+G26Y+NL._AC_UF1000,1000_QL80_.jpg',
    bookUrl: 'https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Classic',
    condition: 'Used',
    location: 'San Francisco, CA',
    imageUrl: 'https://m.media-amazon.com/images/I/91p5b0UvG-L._AC_UF1000,1000_QL80_.jpg',
    bookUrl: 'https://www.amazon.com/Catcher-Rye-J-D-Salinger/dp/0316769487',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    condition: 'New',
    location: 'Boston, MA',
    imageUrl: 'https://m.media-amazon.com/images/I/71jZJ+1q+2L._AC_UF1000,1000_QL80_.jpg',
    bookUrl: 'https://www.amazon.com/Lord-Rings-J-R-R-Tolkien/dp/0618640150',
  },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('MongoDB connected');

    await Book.deleteMany({});
    console.log('Books cleared');

    const user = await User.findOne();
    if (!user) {
      console.log('No user found, please create a user first');
      return;
    }

    const booksWithOwner = books.map(book => ({ ...book, owner: user._id }));
    await Book.insertMany(booksWithOwner);
    console.log('Books seeded');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding books:', error);
  }
};

seedBooks();
