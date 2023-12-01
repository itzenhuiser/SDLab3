const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { getPassword } = require('./scripts');

const host = '0.0.0.0';
const port = process.env.PORT || 8000;

const app = express();

// Session middleware setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());

app.use(express.static('.'));
//app.use(bodyParser.urlencoded({ extended: false }));

// Login route
app.post('/login', async (req, res) => {
    console.log('in the vag')
  const { username, password } = req.body;
  try {
    const correctPassword = await getPassword(username);
    // console.log(req.body);
    // console.log(correctPassword);
    // console.log(password);
    if (correctPassword && password === correctPassword) {
      // Save the username in the session
      req.session.username = username;
      console.log('Login successful');
      res.json({ loggedIn: true, redirect: '/login_redirect.html'});
    } else {
      console.log('Login failed');
      res.json({ loggedIn: false, redirect: '/login_failed_redirect.html'});
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
// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
      } else {
        res.redirect('/login.html'); // Redirect to the login page after logout
      }
    });
  });

app.listen(port, host, () => console.log('Server is running on port 8000'));