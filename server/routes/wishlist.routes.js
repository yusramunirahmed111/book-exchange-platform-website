const router = require('express').Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlist.controller');
const auth = require('../middleware/auth');

router.get('/', auth, getWishlist);
router.post('/', auth, addToWishlist);
router.delete('/:id', auth, removeFromWishlist);

module.exports = router;
