import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();   // ✅ FIXED

export const useBookContext = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  axios.defaults.headers.common['x-access-token'] = token;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.token);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    books,
    setBooks,
    wishlist,
    setWishlist,
    requests,
    setRequests,
    user,
    setUser: login,
    authModalOpen,
    setAuthModalOpen,
    logout,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
