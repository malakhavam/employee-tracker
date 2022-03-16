const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Port
      port: 3001,
      // MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Yfnfkb1963!',
      database: 'election'
    },
    console.log('Connected to the employeetracker database.')
  );

  module.exports = db;