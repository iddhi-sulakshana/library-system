const express = require('express');
const UserModel = require('../models/user');

const router = express.Router();
// router.get("/", tokenMiddleware, (req, res)=>{

// })

router.post('/', async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    const user = await UserModel.create(userData);

    res.json(user);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne( {email} );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password; // You may want to hash the password before saving it

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user route
router.delete('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Find the user by email and delete
    const deletedUser = await UserModel.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
