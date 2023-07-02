// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "naverwebtoon_analyzer",
  password: "password",
});

// simple query
// connection.query("select version()", function (err, results, fields) {
//   console.log(results);
// });

module.exports = connection;
