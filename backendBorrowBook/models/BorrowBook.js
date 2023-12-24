const mongoose = require('mongoose');

const borrowbookSchema = new mongoose.Schema({
 
 id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  bookid: {
    type: String,
    required: true,
   
  },
 address: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  
 pno: {
    type:Number,
    required:true
  },
 tackdate: {
    type:Date,
    required:true
  },
 deliverydate: {
    type:Date,
    required:true
  },
});

// Use the schema to create the User model
const BorrowBook = mongoose.model('BorrowBook', borrowbookSchema);

module.exports = {BorrowBook};
