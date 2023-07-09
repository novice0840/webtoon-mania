// get the client
const mysql = require("mysql2/promise");

const init = async () => {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "naverwebtoon_analyzer",
    password: "password",
  });
  return connection;
};

const test = async () => {
  // simple query
  const connection = await init();
  const [rows, fields] = await connection.execute("select version()");
  console.log(rows, fields);
};
