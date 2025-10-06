// app.js
const express = require('express');
const axios = require('axios');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Root route
app.get('/', async (req, res) => {
  try {
    // Fetch a random joke from an API
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const joke = response.data;

    // Render the view and pass the joke to it
    res.render('index', { joke });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.render('index', { joke: { setup: 'Oops!', punchline: 'Something went wrong.' } });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
