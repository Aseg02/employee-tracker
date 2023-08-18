const mysql = require('mysql2');

// Connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'm12hw',
    password: 'pass123',
    database: 'employee_tracker'
});

module.exports = db;