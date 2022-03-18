const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Port
      port: 3306,
      // MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Yfnfkb1963!',
      database: 'employeetracker'
    },
    console.log('Connected to the employeetracker database.')
  );

  db.connect(function (err) {
    if (err) throw err;
  });

  module.exports = db;