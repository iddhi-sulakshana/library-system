const express = require('express');
const UserModel = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
        if( user ) {
            if ( user.password === password ) {
              res.json("Success");
            } 
            else {
              res.json('The password dosent match');
            }
          }
          else {
              res.json('The user dosent exist');
            }
    });
});

module.exports = router;