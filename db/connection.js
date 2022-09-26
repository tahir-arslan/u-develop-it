const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // change password to match login for MySQL
        password: ' ',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;