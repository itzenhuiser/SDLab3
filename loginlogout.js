function handleLogin(username, password) {
  // Get the current window location (URL)
  var currentLocation = window.location;

  fetch(`${currentLocation.protocol}//${currentLocation.hostname}:${currentLocation.port}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'same-origin' // Needed for session cookies if you're using them
  })
  .then(response => response.json())
  .then(data => {
      console.log('This is what the client is receiving:', data);

      // Set login status and update navigation bar based on the response
      localStorage.setItem('isLoggedIn', data.loggedIn ? 'true' : 'false');
      updateNavigationBar(data.loggedIn);

      if (data.loggedIn) {
          // Redirect to the specified URL on successful login
          window.location.href = data.redirect;
      } else {
          console.log("Login failed");
      }
  })
  .catch(error => {
      console.error('Login error:', error);
  });
}

function handleLogout() {
  // Get the current window location (URL)
  var currentLocation = window.location;

  fetch(`${currentLocation.protocol}//${currentLocation.hostname}:${currentLocation.port}/logout`, {
    method: 'GET', // Change this to GET
    credentials: 'same-origin' // Include cookies in the request
  })
  .then(response => {
    if (response.ok) {
      localStorage.setItem('isLoggedIn', 'false');
      updateNavigationBar(false); // Update the navigation bar
      window.location.href = 'index.html'; // Redirect to the index page
    } else {
      console.error('Logout failed');
    }
  })
  .catch(error => {
    console.error('Error during logout', error);
  });
}

// Function to update the navigation bar based on user's login status
function updateNavigationBar(isLoggedIn) {
  const loginLogoutButton = document.getElementById('loginLogoutButton');
  if (isLoggedIn) {
      loginLogoutButton.innerHTML = '<a href="#" onclick="handleLogout()">Logout</a>';
      console.log('setting login button to true');
  } else {
      loginLogoutButton.innerHTML = '<a href="login.html">Login</a>';
      console.log("updatenav called but is logged in was false")
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Select the form using its ID
  const form = document.getElementById('loginForm');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the default form submission
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          handleLogin(username, password); // Call handleLogin with the credentials
      });
  } else {
      console.log('Form not found!');
  }
});
