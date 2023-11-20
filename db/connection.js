const mysql = require('mysql2');

// Create a promise wrapper for the connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Money123',
  database: 'employee_tracker_db'
});

// Use async/await with the promise wrapper
const executeQuery = async (sql, params) => {
  const [rows, fields] = await db.promise().execute(sql, params);
  return rows;
};

module.exports = {
  executeQuery,
};
