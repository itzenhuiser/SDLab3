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
   
  async function insertUser(id, username, password) {
    try {
      const query = 'INSERT INTO "SDLab3"."login" (username, password) VALUES ($1, $2)';
      await client.query(query, [username, password]);
      console.log('user inserted successfully!');
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }

  function promptUser() {
    rl.question('Enter new username: ', async (username) => {
      try {
        rl.question('Enter new password: ', async (password) => {
          await insertUser(username, password);
          rl.close();
          client.end();
        });
      } catch (err) {
        console.error(err);
      }
    });
  }
    
   
  promptUser();
   
   
  module.exports = { insertUser };