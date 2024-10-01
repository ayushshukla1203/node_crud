const express = require('express');
const mongoose = require('./db'); // Import MongoDB connection
const User = require('./Models/User');   // Correct capitalization

const app = express();  // Initialize the express app
require('dotenv').config();


// Parse incoming request bodies in a middleware
app.use(express.json()); // Built-in middleware for parsing JSON bodies

/* app.use(express.json()): This middleware ensures that incoming JSON request bodies are parsed and made available in req.body.
Without this middleware, req.body will be undefined, which causes the validation errors you're seeing (because no data is passed to the Mongoose model).  */


app.get('/', function (req, res) {
  res.send('Hey! Welcome to my page')
  console.log("hey Hello World");
  
})


app.get('/add', function (req, res) {
    res.send('welcome to this add page');
});

// Create a new user (C in CRUD)
// app.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body); // Create new user from request body
//     await user.save();               // Save user to the database
//     res.status(201).send(user);       // Send success response
//   } catch (err) {
//     res.status(400).send(err);        // Handle error
//   }
// });

// // Get all users (R in CRUD)
// app.get('/all_users', async (req, res) => {
//   try {
//     const users = await User.find();  // Get all users from the collection
//     console.log('This is for log');
    
//     res.send(users);                  // Send user list as response
//   } catch (err) {
//     res.status(500).send(err);        // Handle error
//   }
// });

// // Get a user by ID (R in CRUD)
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id); // Find user by ID
//     if (!user) return res.status(404).send('User not found');
//     res.send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// Update a user by ID (U in CRUD)
app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a user by ID (D in CRUD)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Delete user by ID
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//import the routes file
// const userRoutes = require('./routes/userRoutes');

const userRoutes = require('./routes/userRoutes');



//use the routers
app.use('/users',userRoutes);


const port = process.env.PORT || 3000

app.listen(port)