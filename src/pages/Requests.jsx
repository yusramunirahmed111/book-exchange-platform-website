import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BookContext } from '../context/BookContext';

const Requests = () => {
  const { user } = useContext(BookContext);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const received = await axios.get('http://localhost:5000/api/requests/received', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setReceivedRequests(received.data);

      const sent = await axios.get('http://localhost:5000/api/requests/sent', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setSentRequests(sent.data);
    } catch (err) {
      setError('Failed to fetch requests.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, { status }, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      fetchRequests(); // Refetch to show updated status
    } catch (err) {
      console.error('Failed to update request status', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Book Requests</h2>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('received')}
            className={`${activeTab === 'received' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Received
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`${activeTab === 'sent' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Sent
          </button>
        </nav>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6">
        {activeTab === 'received' && (
          <div>
            {receivedRequests.length === 0 && !loading && <p>No received requests.</p>}
            <ul className="space-y-4">
              {receivedRequests.map(req => (
                <li key={req._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{req.book.title}</p>
                    <p className="text-sm text-gray-600">Requested by: {req.requester.username}</p>
                    <p className="text-sm text-gray-500">Status: {req.status}</p>
                  </div>
                  {req.status === 'Pending' && (
                    <div className="space-x-2">
                      <button onClick={() => handleStatusUpdate(req._id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                      <button onClick={() => handleStatusUpdate(req._id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'sent' && (
          <div>
            {sentRequests.length === 0 && !loading && <p>No sent requests.</p>}
            <ul className="space-y-4">
              {sentRequests.map(req => (
                <li key={req._id} className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold">{req.book.title}</p>
                  <p className="text-sm text-gray-600">Owner: {req.owner.username}</p>
                  <p className="text-sm text-gray-500">Status: {req.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;