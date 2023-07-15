// get the client
const mysql = require("mysql2/promise");

const db_init = async () => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "naverwebtoon_analyzer",
    password: "password",
  });
  return connection;
};

module.exports = db_init;
