import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MagnifyingGlassIcon, UserCircleIcon, HeartIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useBookContext } from '../context/BookContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, setAuthModalOpen } = useBookContext();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                BookSwap
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/listings" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Browse Books
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Wishlist
            </Link>
            <Link to="/messages" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Messages
            </Link>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all">
              Add Your Book
            </button>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Logout
                </button>
                <span className="text-gray-700 font-medium">Welcome, {user.username}</span>
              </>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Login
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/listings" className="block text-gray-700 hover:text-purple-600">
              Browse Books
            </Link>
            <Link to="/wishlist" className="block text-gray-700 hover:text-purple-600">
              Wishlist
            </Link>
            <Link to="/messages" className="block text-gray-700 hover:text-purple-600">
              Messages
            </Link>
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md">
              Add Your Book
            </button>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-700 hover:text-purple-600">
                  Dashboard
                </Link>
                <button onClick={logout} className="block w-full text-left text-gray-700 hover:text-purple-600">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="block w-full text-left text-gray-700 hover:text-purple-600">
                Login
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;