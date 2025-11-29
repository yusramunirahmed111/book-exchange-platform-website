const router = require('express').Router();
const { getMessages, sendMessage } = require('../controllers/message.controller');
const auth = require('../middleware/auth');

router.get('/:bookId/:receiverId', auth, getMessages);
router.post('/', auth, sendMessage);

module.exports = router;
