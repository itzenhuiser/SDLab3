const { Client } = require("pg");
const readline = require("readline");

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new Client({
  user: "mdb_student19",
  host: "s-l112.engr.uiowa.edu",
  database: "mdb_student19",
  password: "Rebel778",
  port: 5432,
  currentSchema: "home",
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

async function getPassword(username) {
  try {
    const query = 'SELECT password FROM "SDLab3"."login" WHERE username = $1';
    const result = await client.query(query, [username]);

    if (result.rows.length > 0) {
      return result.rows[0].password;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

function promptUser() {
  rl.question('Enter username: ', (username) => {
    rl.question('Enter password: ', async (password) => {
      try {
        const correctPassword = await getPassword(username);
        if (correctPassword && password === correctPassword) {
          console.log('Login successful');
          //handleLogin();
        } else {
          console.log('Login failed');
        }
      } catch (err) {
        console.error(err);
      } finally {
        client.end();
        rl.close();
      }
    });
  });
}

promptUser();


module.exports = { getPassword };
