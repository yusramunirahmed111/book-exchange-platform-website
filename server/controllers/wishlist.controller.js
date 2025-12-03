const Wishlist = require('../models/wishlist.model');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.user_id });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  const { bookTitle, author } = req.body;
  const user = req.user.user_id;

  const newWishlistItem = new Wishlist({
    user,
    bookTitle,
    author,
  });

  try {
    const savedItem = await newWishlistItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) return res.status(404).json({ message: 'Item not found in wishlist' });

    if (wishlistItem.user.toString() !== req.user.user_id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Wishlist.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};