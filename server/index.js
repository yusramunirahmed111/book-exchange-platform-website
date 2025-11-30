const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});