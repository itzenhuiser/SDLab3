const express = require('express');
const bodyParser = require('body-parser');
const { getPassword } = require('./scripts');

const app = express();

app.use(express.static('.'));

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const correctPassword = await getPassword(username);
      if (correctPassword && password === correctPassword) {
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

app.listen(8000, () => console.log('Server is running on port 8000'));