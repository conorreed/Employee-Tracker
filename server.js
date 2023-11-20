
const express = require('express');
const { getAllDepartments, addDepartment, getAllRoles, addRole, getAllEmployees, addEmployee, updateEmployeeRole } = require('./db/queries');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/api/new-department', async (req, res) => {
  try {
    const { department_name } = req.body;
    await addDepartment(department_name);
    res.json({ message: 'Department added successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json({ message: 'success', data: departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create role
app.post('/api/new-role', async (req, res) => {
  try {
    const { title, salary, department_id } = req.body;
    await addRole(title, salary, department_id);
    res.json({ message: 'Role added successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all roles
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json({ message: 'success', data: roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create employee
app.post('/api/new-employee', async (req, res) => {
  try {
    const { first_name, last_name, role_id, manager_id } = req.body;
    await addEmployee(first_name, last_name, role_id, manager_id);
    res.json({ message: 'Employee added successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json({ message: 'success', data: employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update employee role
app.put('/api/update-employee-role/:id', async (req, res) => {
  try {
    const { role_id } = req.body;
    const { id } = req.params;
    await updateEmployeeRole(id, role_id);
    res.json({ message: 'Employee role updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
