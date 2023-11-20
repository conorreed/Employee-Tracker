-- seeds.sql
USE employee_tracker_db;

INSERT INTO department (department_name) VALUES ('Sales'), ('Marketing'), ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 80000, 3),
  ('Marketing Manager', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 2);
