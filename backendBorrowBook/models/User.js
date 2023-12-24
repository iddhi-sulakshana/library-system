const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  pno: {
    type: Number,
    required: true,
  },
});

// Use the schema to create the User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
