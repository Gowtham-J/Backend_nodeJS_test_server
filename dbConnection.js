const util = require("util");
const mysql = require("mysql");

require("dotenv").config();

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
  insecureAuth: true,
  // port: 3307,
};

function makeDb(config) {
  const connection = mysql.createConnection(config);
  if (connection) console.log("database connected");
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

const db = makeDb(config);

module.exports = db;
