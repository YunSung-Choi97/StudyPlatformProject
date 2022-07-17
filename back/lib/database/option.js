const dotenv = require('dotenv');

dotenv.config();

const db_option = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

module.exports = db_option;