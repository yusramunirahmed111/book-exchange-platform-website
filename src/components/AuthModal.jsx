import React, { useState, useContext } from 'react';
import { BookContext } from '../Context/BookContext';
import axios from 'axios';

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, setUser } = useContext(BookContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(response.data);
      setAuthModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      setUser(response.data);
      setAuthModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Failed to register');
    }
  };

  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{isLogin ? 'Login' : 'Register'}</h2>
          <button onClick={() => setAuthModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-purple-600 hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
