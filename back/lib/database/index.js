const mysql = require('mysql');

const db_option = require('./option');

const db = mysql.createConnection(db_option);

module.exports = db;