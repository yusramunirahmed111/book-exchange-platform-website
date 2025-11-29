import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookContext } from '../Context/BookContext';
import { ArrowLeftIcon, EnvelopeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setAuthModalOpen } = useContext(BookContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const fetchBookAndReviews = async () => {
    try {
      const bookResponse = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(bookResponse.data);

      const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Error fetching book details or reviews:', error);
    }
  };

  useEffect(() => {
    fetchBookAndReviews();
  }, [id]);

  const handleRequestBook = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/requests',
        { bookId: book._id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert('Book requested successfully!');
    } catch (error) {
      alert('Failed to request book.');
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setRating(0);
      setComment('');
      fetchBookAndReviews();
    } catch (error) {
      alert('Failed to add review.');
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 hover:text-purple-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to listings
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 flex flex-col items-center bg-gray-50 relative">
            <div className="relative h-96 w-full">
              <img
                className="w-full h-full object-contain rounded-lg shadow-md"
                src={
                  book.imageUrl ||
                  'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                }
                alt={book.title}
              />
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-xl text-gray-600 mt-1">{book.author}</p>

            <div className="mt-4 flex items-center flex-wrap gap-2">
              <span className="text-gray-600">{book.genre}</span>
            </div>

            <div className="mt-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  book.condition === 'New'
                    ? 'bg-green-100 text-green-800'
                    : book.condition === 'Like New'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {book.condition}
              </span>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex space-x-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('owner')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'owner'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Owner Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700">
                      {book.description || 'No description available.'}
                    </p>
                    <div className="mt-6 flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">Available in {book.location}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'owner' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {book.owner.username}
                      </h3>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                    {reviews.length > 0 ? (
                      <ul className="space-y-4">
                        {reviews.map((review) => (
                          <li key={review._id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <p className="ml-2 font-semibold">{review.user.username}</p>
                            </div>
                            <p>{review.comment}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No reviews yet.</p>
                    )}

                    <form onSubmit={handleAddReview} className="mt-6">
                      <h4 className="text-xl font-bold mb-2">Write a review</h4>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-8 w-8 cursor-pointer ${
                              i < rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            onClick={() => setRating(i + 1)}
                          />
                        ))}
                      </div>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        rows="3"
                        placeholder="Share your thoughts..."
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRequestBook}
                disabled={!user || (book.owner && user._id === book.owner._id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Request This Book
              </button>
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-purple-600" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
