const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true,
  },
  
  book_image: {
    type:String,
    required:true
  },
});

// Use the schema to create the User model
const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
