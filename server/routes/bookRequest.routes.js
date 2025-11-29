const router = require('express').Router();
const {
  createBookRequest,
  getReceivedBookRequests,
  getSentBookRequests,
  updateBookRequestStatus,
} = require('../controllers/bookRequest.controller');
const auth = require('../middleware/auth');

router.post('/', auth, createBookRequest);
router.get('/received', auth, getReceivedBookRequests);
router.get('/sent', auth, getSentBookRequests);
router.put('/:id', auth, updateBookRequestStatus);

module.exports = router;
