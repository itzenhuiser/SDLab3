const express = require('express');
const bodyParser = require('body-parser');
const { getPassword } = require('./scripts');

const app = express();

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const correctPassword = await getPassword(username);
    if (correctPassword && password === correctPassword) {
      console.log('Login successful');
      res.send('Login successful');
    } else {
      console.log('Login failed');
      res.send('Login failed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.listen(8000, () => console.log('Server is running on port 8000'));