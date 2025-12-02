const router = require('express').Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/book.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', auth, upload.single('imageUrl'), createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
