const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { getPassword } = require('./scripts');

const app = express();

// Session middleware setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: false }));

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const correctPassword = await getPassword(username);
    if (correctPassword && password === correctPassword) {
      // Save the username in the session
      req.session.username = username;
      console.log('Login successful');
      res.redirect('/login_redirect.html'); // Redirect to the login result page
    } else {
      console.log('Login failed');
      res.redirect('/login_failed_redirect.html');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Example route that requires user to be logged in
app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send(`Welcome, ${req.session.username}!`);
  } else {
    res.redirect('/login.html'); // Redirect to the login page if not logged in
  }
});

app.listen(8000, () => console.log('Server is running on port 8000'));