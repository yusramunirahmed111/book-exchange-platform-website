import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative pb-2/3 h-48">
        <img 
          className="absolute h-full w-full object-cover" 
          src={book.imageUrl || 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'} 
          alt={book.title}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            book.condition === 'New' ? 'bg-green-100 text-green-800' :
            book.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {book.condition}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">{book.location}</span>
          <Link 
            to={`/book/${book._id}`}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;