require("dotenv").config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGDB_USER,
    host: process.env.PGDB_HOST,
    database: process.env.PGDB_NAME,
    password: process.env.PGDB_PASSWORD,
    port: process.env.PGDB_PORT,
  });

module.exports = pool;