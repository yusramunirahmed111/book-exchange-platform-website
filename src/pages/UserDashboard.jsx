import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useBookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';

const UserDashboard = () => {
  const { user } = useBookContext();
  const [listedBooks, setListedBooks] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchDashboardData = async () => {
        try {
          const [listedBooksRes, sentRequestsRes, receivedRequestsRes] = await Promise.all([
            axios.get('http://localhost:5000/api/books'),
            axios.get('http://localhost:5000/api/requests/sent'),
            axios.get('http://localhost:5000/api/requests/received'),
          ]);
          setListedBooks(listedBooksRes.data.filter(book => book.owner._id === user._id));
          setSentRequests(sentRequestsRes.data);
          setReceivedRequests(receivedRequestsRes.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };
      fetchDashboardData();
    }
  }, [user]);

  if (!user) {
    return <div className="text-center mt-10">Please log in to see your dashboard.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user.username}!</h1>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Listed Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listedBooks.map(book => <BookCard key={book._id} book={book} />)}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sent Requests</h2>
        {sentRequests.length > 0 ? (
          <ul className="space-y-2">
            {sentRequests.map(req => (
              <li key={req._id} className="p-4 bg-white rounded-lg shadow">
                You requested <strong>{req.book.title}</strong> from <strong>{req.owner.username}</strong> - Status: {req.status}
              </li>
            ))}
          </ul>
        ) : <p>You haven't sent any requests.</p>}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Received Requests</h2>
        {receivedRequests.length > 0 ? (
          <ul className="space-y-2">
            {receivedRequests.map(req => (
              <li key={req._id} className="p-4 bg-white rounded-lg shadow">
                <strong>{req.requester.username}</strong> requested <strong>{req.book.title}</strong> - Status: {req.status}
                {req.status === 'Pending' && (
                  <div className="mt-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Approve</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md">Reject</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : <p>You have no incoming requests.</p>}
      </div>
    </div>
  );
};

export default UserDashboard;
