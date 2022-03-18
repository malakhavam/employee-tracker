/* Departments*/
INSERT INTO department (name)
VALUES
  ('Electricians'),
  ('Human Resources'),
  ('Finance'),
  ('Executive office');

/* Roles */

/* Electricians */
INSERT INTO role (title, salary, department_id)
VALUES 
  ('Electrician team lead', 100000, 1),
  ('Electrician', 80000, 1),
/* HR */
  ('HR Manager', 150000, 2),
  ('HR Coordinator', 120000, 2),
/* Accounting Department */
  ('Lead Accountant', 150000, 3),
  ("Accountant", 125000, 3),
/* Executive office */
  ('Executive office', 250000, 4);

/* Employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
/* John Doe, Electrician, Electricians Department */
      ('John', 'Doe', 1, null), 
/* Petrs Melnikovs, Electrician team lead, Electricians Department  */
      ('Petrs', 'Melnikovs', 1, 1),
/* Oleksii Nikitenko, Electrician, Electricians Department */
      ('Oleksii', 'ikitenko', 2, 2),
/* Maryia Malakhava, HR Manager, HR */
      ('Maryia', 'Malakhava', 3, null),
/* Natallia Titova, HR Coordinator, HR */
      ('Natallia', 'Titova', 4, 4),
/* Kamal Makhamov, Lead Accountant, Accounting Department */
      ('Kamal', 'Makhamov', 5, null),
/* Marina Pron, Accountant, Accounting Department */
      ('Marina', 'Pron', 6, 6),
/* Konstantin Archakov, Executive officer, Executive office */
      ('Konstantin', 'Archakov', 7, null);