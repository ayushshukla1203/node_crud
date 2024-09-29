const express = require('express');
const router = express.Router();  // Change router to routes
const User = require('./../Models/User')

router.post('/', async (req, res) => {
    try {
      const user = new User(req.body); // Create new user from request body
      await user.save();               // Save user to the database
      res.status(201).send(user);       // Send success response
    } catch (err) {
      res.status(400).send(err);        // Handle error
    }
  });
  
  // Get all users (R in CRUD)
  router.get('/', async (req, res) => {
    try {
      const users = await User.find();  // Get all users from the collection
      console.log('This is for log');
      
      res.send(users);                  // Send user list as response
    } catch (err) {
      res.status(500).send(err);        // Handle error
    }
  });
  
  // Get a user by ID (R in CRUD)
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id); // Find user by ID
      if (!user) return res.status(404).send('User not found');
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = router;