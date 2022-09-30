const { Pool } = require("pg");

const connect = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "Intro-backend",
  port: "5430",
});

module.exports = connect;
