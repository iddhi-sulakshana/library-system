const express = require('express');
const router = express.Router();
const { User } = require('../models/User');


router.post('/userregister', async (req, res) => {
    try {
    
          const existingUser = await User.findOne({ id: req.body.id });
          if (existingUser) {
            return res.status(409).json({ message: 'Nic is already taken' });
            
          }
    
          const newUser = new User(req.body);
          await newUser.save();
    
          return res.status(201).json(newUser);
        
    
      } catch (error) {
        console.error("Error adding User:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

router.get('/userregister', async (req, res) => {
    try {
    
          const newUser = await User.find();
          return res.status(201).json(newUser);
        
    
      } catch (error) {
        console.error("Error fetchin User:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (user) {
      // Only send necessary user data, modify this based on your schema
      const userData = {
        id: user.id,
        username: user.username,
        address:user.address,
        email: user.email,
        pno: user.pno,
      };

      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;