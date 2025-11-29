import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BookContext } from '../context/BookContext';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const Wishlist = () => {
  const { user } = useContext(BookContext);
  const [wishlist, setWishlist] = useState([]);
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');

  const fetchWishlist = async () => {
    if (user) {
      try {
        const response = await axios.get('http://localhost:5000/api/wishlist', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/wishlist', { bookTitle, author }, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setBookTitle('');
      setAuthor('');
      fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Please log in to see your wishlist.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Wishlist</h1>
      
      <form onSubmit={handleAdd} className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Add a book to your wishlist</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-lg"
            required
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center">
            <PlusIcon className="h-5 w-5 mr-1" /> Add
          </button>
        </div>
      </form>

      {wishlist.length > 0 ? (
        <ul className="space-y-4">
          {wishlist.map(item => (
            <li key={item._id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{item.bookTitle}</h3>
                <p className="text-gray-600">{item.author}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;

