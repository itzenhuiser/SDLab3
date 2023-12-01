   
   function handleLogin() {
    console.log("handlelogin called");
    // Example client-side code to handle the server response
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'example', password: 'password' }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          // Set the login status in local storage
          localStorage.setItem('isLoggedIn', 'true');
          console.log("here");
          window.location.href = login_redirect.html; // Redirect to the specified URL
        } else {
          // Handle login failure
          handleLogout();
        }
      });
    }
  
  // Function to handle logout
  function handleLogout() {
    // Send a request to the server to logout the user
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin' // Include cookies in the request
    })
    .then(response => {
      if (response.ok) {
        // Redirect the user to the login page upon successful logout
        window.location.href = 'login.html';
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error during logout', error);
    });
    updateNavigationBar(false);
  }
  
  
   
   
   
   // Function to update the navigation bar based on user's login status
    function updateNavigationBar(isLoggedIn) {
      const loginLogoutButton = document.getElementById('loginLogoutButton');
      if (isLoggedIn) {
        loginLogoutButton.innerHTML = '<a href="#" onclick="handleLogout()">Logout</a>';
        localStorage.setItem('isLoggedIn', 'true');
        console.log('setting login button to true');
      } else {
        loginLogoutButton.innerHTML = '<a href="login.html">Login</a>';
        localStorage.setItem('isLoggedIn', 'false');
        console.log("updatenav called but is logged in was false")
      }
    }

    // Check isLoggedIn state on page load
    document.addEventListener('DOMContentLoaded', function() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if(isLoggedIn){
        handleLogout();
      }
      else{
        handleLogin();
      }
    });