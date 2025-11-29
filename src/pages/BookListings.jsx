import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import AddBook from '../components/AddBook';
import { BookContext } from '../context/BookContext';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const BookListings = () => {
  const { user } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [addingBook, setAddingBook] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!addingBook) {
      fetchBooks();
    }
  }, [addingBook]);

  useEffect(() => {
    let result = books;
    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (genre) {
      result = result.filter(book => book.genre === genre);
    }
    if (location) {
      result = result.filter(book => book.location.toLowerCase().includes(location.toLowerCase()));
    }
    setFilteredBooks(result);
  }, [searchTerm, genre, location, books]);

  const genres = [...new Set(books.map(book => book.genre))];
  const locations = [...new Set(books.map(book => book.location))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {addingBook && <AddBook setAddingBook={setAddingBook} />}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Available Books</h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or author"
              className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {user && (
            <button
              onClick={() => setAddingBook(true)}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="border rounded-full px-4 py-2">
          <option value="">All Genres</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-full px-4 py-2">
          <option value="">All Locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListings;