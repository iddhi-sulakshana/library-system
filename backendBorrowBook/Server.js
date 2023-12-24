const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');
const borrowbookRoutes = require('./routes/BorrowBookRoutes');

dotenv.config()
const app = express();
const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrowbook', borrowbookRoutes);

app.listen(port, () => {
  console.log('Server is running on port', port);
});