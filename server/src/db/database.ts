const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];

const db = require("knex")(config);

//Check for database connection
db.raw("SELECT VERSION()")
  .then(() => {
    console.log("Connection established");
  })
  .catch((error: Error) => {
    console.log(error);
  }
);

export default db;