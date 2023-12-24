const express = require('express');
const router = express.Router();
const { Book } = require('../models/Book');


router.post('/bookregister', async (req, res) => {
    try {
    
          const existingBook = await Book.findOne({ bookid: req.body.bookid });
          if (existingBook) {
            return res.status(409).json({ message: 'Nic is already taken' });
            
          }
    
          const newBook = new Book(req.body);
          await newBook.save();
    
          return res.status(201).json(newBook);
        
    
      } catch (error) {
        console.error("Error adding Book:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

router.get('/bookregister', async (req, res) => {
    try {
    
          const Bookss = await Book.find();  
          return res.status(200).json(Bookss);
        
    
      } catch (error) {
        console.error("Error fetch Book:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

module.exports = router;