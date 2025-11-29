import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRightIcon, BookOpenIcon, ChartBarIcon, HeartIcon, UsersIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setFeaturedBooks(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Discover, Share,</span>
                  <span className="block text-purple-200">Exchange Books</span>
                </h1>
                <p className="mt-3 text-base text-purple-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join a community of book lovers who share your passion. Find your next read, exchange books you've loved, and connect with fellow readers.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/listings"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 md:py-4 md:text-lg md:px-10"
                    >
                      Browse Books
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/listings"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="People reading books"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to exchange books
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              BookSwap makes it easy to find new reads and share books you've loved with others.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: BookOpenIcon,
                  title: "Huge Selection",
                  description: "Thousands of books across all genres from fellow readers."
                },
                {
                  icon: HeartIcon,
                  title: "Save Money",
                  description: "Get books for free or trade ones you've already read."
                },
                {
                  icon: UsersIcon,
                  title: "Community",
                  description: "Connect with local book lovers and join reading groups."
                },
                {
                  icon: ChartBarIcon,
                  title: "Eco-Friendly",
                  description: "Reduce waste by reusing books instead of buying new."
                }
              ].map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Recently Added</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Discover new books
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={book.imageUrl || 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'}
                    alt={book.title}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">{book.location}</span>
                    <Link
                      to={`/book/${book._id}`}
                      className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      View <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/listings"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              View All Books
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our members say
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote: "I've discovered so many amazing books through BookSwap that I never would have found otherwise. The community is wonderful!",
                author: "Sarah J.",
                role: "Book Lover"
              },
              {
                quote: "As an avid reader on a budget, BookSwap has saved me hundreds of dollars while letting me read all the books I want.",
                author: "Michael T.",
                role: "College Student"
              },
              {
                quote: "I love sharing books I've enjoyed with others. It's so rewarding to see my old favorites find new readers.",
                author: "Priya K.",
                role: "Teacher"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <SparklesIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-purple-600 font-medium">{testimonial.author}</div>
                <div className="text-gray-500 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Start exchanging books today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-purple-200">
            Join thousands of readers who are discovering new books and sharing their favorites.
          </p>
          <Link
            to="/listings"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 sm:w-auto"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;