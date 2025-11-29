import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BookContext } from '../context/BookContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Messages = () => {
  const { user } = useContext(BookContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchConversations = async () => {
        try {
          const received = await axios.get('http://localhost:5000/api/requests/received', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          const sent = await axios.get('http://localhost:5000/api/requests/sent', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          
          const convos = [...received.data, ...sent.data].map(req => ({
            ...req,
            otherUser: req.owner._id === user._id ? req.requester : req.owner
          }));

          setConversations(convos);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      };
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/messages/${selectedConversation.book._id}/${selectedConversation.otherUser._id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation, user.token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await axios.post('http://localhost:5000/api/messages', {
        receiverId: selectedConversation.otherUser._id,
        bookId: selectedConversation.book._id,
        message: newMessage,
      }, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  if (!user) {
    return <div className="text-center mt-10">Please log in to view your messages.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-120px)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <ul className="overflow-y-auto h-full">
          {conversations.map(convo => (
            <li 
              key={convo._id}
              onClick={() => setSelectedConversation(convo)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedConversation?._id === convo._id ? 'bg-purple-100' : ''}`}
            >
              <h3 className="font-bold">{convo.otherUser.username}</h3>
              <p className="text-sm text-gray-600 truncate">{convo.book.title}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Chat with {selectedConversation.otherUser.username}</h2>
              <p className="text-sm text-gray-500">Regarding: {selectedConversation.book.title}</p>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              {loading ? <p>Loading messages...</p> : messages.map(msg => (
                <div key={msg._id} className={`mb-4 flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${msg.sender._id === user._id ? 'bg-purple-500 text-white' : 'bg-white'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-full"
              />
              <button type="submit" className="ml-2 p-2 bg-purple-500 text-white rounded-full">
                <PaperAirplaneIcon className="h-6 w-6" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;