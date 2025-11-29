const router = require('express').Router();
const { getReviewsForBook, createReview } = require('../controllers/review.controller');
const auth = require('../middleware/auth');

router.get('/:bookId', getReviewsForBook);
router.post('/:bookId', auth, createReview);

module.exports = router;