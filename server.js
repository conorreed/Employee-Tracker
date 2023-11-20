const express = require('express');
import inquirer from 'inquirer';
const {
  getAllDepartments,
  addDepartment,
  getAllRoles,
  addRole,
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
} = require('./db/queries');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function start() {
  let action;

  while (action !== 'Quit') {
    const { selectedAction } = await inquirer.prompt({
      type: 'list',
      name: 'selectedAction',
      message: 'Select an action:',
      choices: [
        'View All Departments',
        'Add Department',
        'View All Roles',
        'Add Role',
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'Quit',
      ],
    });

    action = selectedAction.toLowerCase().replace(/\s/g, '-');

    switch (action) {
      case 'view-all-departments':
        await viewAllDepartments();
        break;
      case 'add-department':
        await promptAddDepartment();
        break;
      case 'view-all-roles':
        await viewAllRoles();
        break;
      case 'add-role':
        await promptAddRole();
        break;
      case 'view-all-employees':
        await viewAllEmployees();
        break;
      case 'add-employee':
        await promptAddEmployee();
        break;
      case 'update-employee-role':
        await promptUpdateEmployeeRole();
        break;
      case 'quit':
        console.log('Exiting the application.');
        break;
      default:
        console.log('Invalid action. Please try again.');
    }
  }
}

async function viewAllDepartments() {
  try {
    const departments = await getAllDepartments();
    console.table(departments);
  } catch (error) {
    console.error(error.message);
  }
}

async function promptAddDepartment() {
  try {
    const inquirerResponse = await inquirer.prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the name of the department:',
      },
    ]);

    const { department_name } = inquirerResponse;
    await addDepartment(department_name);
    console.log('Department added successfully.');
  } catch (error) {
    console.error(error.message);
  }
}

async function viewAllRoles() {
  try {
    const roles = await getAllRoles();
    console.table(roles);
  } catch (error) {
    console.error(error.message);
  }
}

async function promptAddRole() {
  try {
    const inquirerResponse = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ]);

    const { title, salary, department_id } = inquirerResponse;
    await addRole(title, salary, department_id);
    console.log('Role added successfully.');
  } catch (error) {
    console.error(error.message);
  }
}

async function viewAllEmployees() {
  try {
    const employees = await getAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error(error.message);
  }
}

async function promptAddEmployee() {
  try {
    const roles = await getAllRoles();
    const managers = await getAllEmployees();

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const managerChoices = managers.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    }));

    const inquirerResponse = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the employee\'s role:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the employee\'s manager:',
        choices: managerChoices,
      },
    ]);

    const { first_name, last_name, role_id, manager_id } = inquirerResponse;
    await addEmployee(first_name, last_name, role_id, manager_id);
    console.log('Employee added successfully.');
  } catch (error) {
    console.error(error.message);
  }
}

async function promptUpdateEmployeeRole() {
  try {
    const employees = await getAllEmployees();
    const roles = await getAllRoles();

    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const inquirerResponse = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
    ]);

    const { employeeId, roleId } = inquirerResponse;
    await updateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error(error.message);
  }
}

start();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
