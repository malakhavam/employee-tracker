DROP TABLE IF EXISTS departments
DROP TABLE IF EXISTS roles
DROP TABLE IF EXISTS employees

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(9, 2) NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES Departments (department_id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES Roles (role_id)
  
);