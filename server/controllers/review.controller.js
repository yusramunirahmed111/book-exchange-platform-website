const Review = require('../models/review.model');

exports.getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user.user_id;
  const book = req.params.bookId;

  const newReview = new Review({
    book,
    user,
    rating,
    comment,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};