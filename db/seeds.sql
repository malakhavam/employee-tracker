USE employeetracker;

/* Departments*/
INSERT INTO department (name)
VALUES ("Electricians");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Executive office");

/* Roles */
/* Electricians */
INSERT INTO role (title, salary, department_id)
VALUES ("Electrician team lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Electrician", 80000, 1);

/* HR */
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Coordinator", 120000, 2);

/* Accounting Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Accountant", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

/* Executive office */
INSERT INTO role (title, salary, department_id)
VALUES ("Executive office", 250000, 4);



/* Employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* John Doe, Electrician, Electricians Department */
VALUES ("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Petrs Melnikovs, Electrician team lead, Electricians Department  */
VALUES ("Petrs", "Melnikovs", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Oleksii Nikitenko, Electrician, Electricians Department */
VALUES ("Oleksii", "Nikitenko", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Maryia Malakhava, HR Manager, HR */
VALUES ("Maryia", "Malakhava", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Natallia Titova, HR Coordinator, HR */
VALUES ("Natallia", "Titova", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Kamal Makhamov, Lead Accountant, Accounting Department */
VALUES ("Kamal", "Makhamov", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Marina Pron, Accountant, Accounting Department */
VALUES ("Marina", "Pron", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Konstantin Archakov, Executive officer, Executive office */
VALUES ("Konstantin", "Archakov", 7, null);