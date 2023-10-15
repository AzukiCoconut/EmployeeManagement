const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'A1sho7ak!@1974',
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;