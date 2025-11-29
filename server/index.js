const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

const bookRouter = require('./routes/book.routes');
app.use('/api/books', bookRouter);

const bookRequestRouter = require('./routes/bookRequest.routes');
app.use('/api/requests', bookRequestRouter);

const messageRouter = require('./routes/message.routes');
app.use('/api/messages', messageRouter);

const wishlistRouter = require('./routes/wishlist.routes');
app.use('/api/wishlist', wishlistRouter);

const reviewRouter = require('./routes/review.routes');
app.use('/api/reviews', reviewRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
