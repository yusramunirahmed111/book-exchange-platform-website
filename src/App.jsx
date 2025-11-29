import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookListings from './pages/BookListings';
import BookDetails from './pages/BookDetails';
import UserDashboard from './pages/UserDashboard';
import Messages from './pages/Messages';
import Wishlist from './pages/Wishlist';
import Requests from './pages/Requests';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<BookListings />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

