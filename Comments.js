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
 
async function getComments(username) {
    try {
      const query = 'SELECT message, sender FROM "SDLab3"."messages" WHERE host = $1';
      const result = await client.query(query, [username]);
  
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }
 
 
 
 
function promptComments() {
    rl.question('Enter host page name: ', async (username) => {
      try {
        const comments = await getComments(username);
        if (comments && comments.length > 0) {
          console.log('Comments: ');
          comments.forEach((comment) => {
            console.log(`Message: ${comment.message}, Sender: ${comment.sender}`);
          });
        } else {
          console.log('No Comments Found');
        }
      } catch (err) {
        console.error(err);
        }
        finally{
            rl.close()
            client.end()
        }
    });
}
  
 
promptComments();
 
 
module.exports = { getComments };