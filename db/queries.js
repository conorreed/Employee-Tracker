// queries.js
const db = require('./db/connection');

// Function to get all departments
function getAllDepartments() {
  return db.query('SELECT * FROM department');
}

// Function to add a department
function addDepartment(name) {
  return db.query('INSERT INTO department (department_name) VALUES (?)', [name]);
}

// Function to get all roles
function getAllRoles() {
  return db.query('SELECT * FROM role');
}

// Function to add a role
function addRole(title, salary, departmentId) {
  return db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
}

// Function to get all employees
function getAllEmployees() {
  return db.query('SELECT * FROM employee');
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  return db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}

// Function to update employee role
function updateEmployeeRole(employeeId, newRoleId) {
  return db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
}

module.exports = {
  getAllDepartments,
  addDepartment,
  getAllRoles,
  addRole,
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
};
