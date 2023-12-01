
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
   
  async function insertComment(message, host, sender) {
    try {
      const query = 'INSERT INTO "SDLab3"."messages" (message, host, sender) VALUES ($1, $2, $3)';
      await client.query(query, [message, host, sender]);
      console.log('Comment inserted successfully!');
    } catch (error) {
      console.error('Error inserting comment:', error);
      throw error;
    }
  }

  function promptComments() {
    rl.question('Enter host page name: ', async (username) => {
      try {
        rl.question('Enter new comment: ', async (newComment) => {
          await insertComment(newComment, username, 'alex'); // Assuming sender is always 'alex'
          rl.close();
          client.end();
        });
      } catch (err) {
        console.error(err);
      }
    });
  }
    
   
  promptComments();
   
   
  module.exports = { insertComment };