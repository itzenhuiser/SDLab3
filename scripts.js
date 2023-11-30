const { Client } = require("pg");

// Placeholder for any future JavaScript interactivity
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
      const password = result.rows[0].password;
      return password;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

getPassword("tyler")
  .then((password) => {
    console.log("Password = " + password);
  })
  .catch((err) => console.error(err))
  .finally(() => client.end());
