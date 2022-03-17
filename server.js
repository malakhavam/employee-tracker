// Dependencies
const inquirer = require("inquirer");
const table = require("console.table");
// MySQL db
const db = require("./db/connection");
// Prompts
const prompt = require("./utils/questions");
const { option } = require("./utils/questions");
require("console.table");

// launch app
firstOption();

function firstOption() {
	// Main Menu
	inquirer.prompt(prompt.firstPrompt).then(function ({ task }) {
		switch (task) {
			case "View Employees":
				viewEmployee();
				break; 
			case "View Employees by Manager":
				viewEmployeeByManager();
				break; 
			case "View Employees by Department":
				viewEmployeeByDepartment();
				break; 
			case "View Departments":
				viewDepartments();
				break; 
			case "View Roles":
				viewRoles();
				break; 
			case "View Department Budget":
				viewDepartmentBudget();
				break; 
			case "Add Employee":
				addEmployee();
				break; 
			case "Add Department":
				addDepartment();
				break; 
			case "Add Role":
				addRole();
				break; 
			case "Update Employee Role":
				updateEmployeeRole();
				break; 
			case "Update Employee Manager":
				updateEmployeeManager();
				break; 
			case "Remove Employee":
				deleteEmployee();
				break; 
			case "Remove Department":
				deleteDepartment();
				break; 
			case "Remove Role":
				deleteRole();
				break; 
			case "Exit":
				db.end();
				break; 
		}
	});
}


// View Employees
function viewEmployee() {
	console.log("Employees");

	var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

	db.query(query, function (err, res) {
		if (err) throw err;

		console.table(res);
		
		firstPrompt();
	});
}

// View employee by department
function viewEmployeeByManager() {
	console.log("Manager Rota:\n");

	var query = `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
	ON e.role_id = r.id
  	LEFT JOIN department d
  	ON d.id = r.department_id
  	LEFT JOIN employee m
	ON m.id = e.manager_id GROUP BY e.manager_id`;

	db.query(query, function (err, res) {
		if (err) throw err;

		// Select manager to view subordinates
		const managerChoices = res
			// Filter NULL (prevents selecting employees with no assigned manager)
			.filter((mgr) => mgr.manager_id)
			.map(({ manager_id, manager }) => ({
				value: manager_id,
				name: manager,
			}));

		inquirer
			.prompt(prompt.viewManagerPrompt(managerChoices))
			.then(function (answer) {
				var query = `SELECT e.id, e.first_name, e.last_name, r.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
			FROM employee e
			JOIN role r
			ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			LEFT JOIN employee m
			ON m.id = e.manager_id
			WHERE m.id = ?`;

				db.query(query, answer.managerId, function (err, res) {
					if (err) throw err;

					console.table("\nManager's subordinates:", res);
					
					firstPrompt();
				});
			});
	});
}

// View employee by department 
function viewEmployeeByDepartment() {
	console.log("View employees by department\n");

	var query = `SELECT d.id, d.name
	FROM employee e
	LEFT JOIN role r
	ON e.role_id = r.id
	LEFT JOIN department d
	ON d.id = r.department_id
	GROUP BY d.id, d.name`;

	db.query(query, function (err, res) {
		if (err) throw err;

		// Select department
		const departmentChoices = res.map((data) => ({
			value: data.id,
			name: data.name,
		}));

		inquirer
			.prompt(prompt.departmentPrompt(departmentChoices))
			.then(function (answer) {
				var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
			FROM employee e
			JOIN role r
				ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			WHERE d.id = ?`;

				db.query(query, answer.departmentId, function (err, res) {
					if (err) throw err;

					console.table("\nDepartment Rota: ", res);
					
					firstPrompt();
				});
			});
	});
}

// View Departments 
function viewDepartments() {
	var query = "SELECT * FROM department";
	db.query(query, function (err, res) {
		if (err) throw err;
		console.log(`\nDEPARTMENTS:\n`);
		res.forEach((department) => {
			console.log(`ID: ${department.id} | ${department.name} Department`);
		});
		firstPrompt();
	});
}

// View Roles 
function viewRoles() {
	var query = "SELECT * FROM role";
	db.query(query, function (err, res) {
		if (err) throw err;
		console.log(`\nROLES:\n`);
		res.forEach((role) => {
			console.log(
				`ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`,
			);
		});
		
		firstPrompt();
	});
}

// View Department budjet 
function viewDepartmentBudget() {
	var query = `SELECT d.name, 
		r.salary, sum(r.salary) AS budget
		FROM employee e 
		LEFT JOIN role r ON e.role_id = r.id
		LEFT JOIN department d ON r.department_id = d.id
		group by d.name`;

	db.query(query, function (err, res) {
		if (err) throw err;

		console.log(`\nDEPARTMENT BUDGETS:\n`);
		res.forEach((department) => {
			console.log(
				`Department: ${department.name}\n Budget: ${department.budget}\n`,
			);
		});
		
		firstPrompt();
	});
}


// Add Employee 
const addEmployee = () => {
	// Select Employee's Department
	let departmentArray = [];
	db.query(`SELECT * FROM department`, (err, res) => {
		if (err) throw err;

		res.forEach((element) => {
			departmentArray.push(`${element.id} ${element.name}`);
		});
		// Select Employee's Role
		let roleArray = [];
		db.query(`SELECT id, title FROM role`, (err, res) => {
			if (err) throw err;

			res.forEach((element) => {
				roleArray.push(`${element.id} ${element.title}`);
			});
			// Select Employee's Manager
			let managerArray = [];
			db.query(
				`SELECT id, first_name, last_name FROM employee`,
				(err, res) => {
					if (err) throw err;
					res.forEach((element) => {
						managerArray.push(
							`${element.id} ${element.first_name} ${element.last_name}`,
						);
					});
					// Create New Employee
					inquirer
						.prompt(
							prompt.insertEmployee(departmentArray, roleArray, managerArray),
						)
						.then((response) => {
							// Insert chosen elements into employee array
							let roleCode = parseInt(response.role);
							let managerCode = parseInt(response.manager);
							db.query(
								"INSERT INTO employee SET ?",
								{
									first_name: response.firstName,
									last_name: response.lastName,
									role_id: roleCode,
									manager_id: managerCode,
								},
								(err, res) => {
									if (err) throw err;
									console.log("\n" + res.affectedRows + " employee created");
									console.log(
										"\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n",
									);
									viewEmployee();
								},
							);
						});
				},
			);
		});
	});
};

// Add Department
function addDepartment() {
	inquirer.prompt(prompt.insertDepartment).then(function (answer) {
		var query = "INSERT INTO department (name) VALUES ( ? )";
		db.query(query, answer.department, function (err, res) {
			if (err) throw err;
			console.log(
				`You have added this department: ${answer.department.toUpperCase()}.`,
			);
		});
		console.log("added dpt");
		viewDepartments();
	});
}

// Add role
function addRole() {
	var query = `SELECT * FROM department`;

	db.query(query, function (err, res) {
		if (err) throw err;
		// Select department for role
		const departmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		inquirer
			.prompt(prompt.insertRole(departmentChoices))
			.then(function (answer) {
				var query = `INSERT INTO role SET ?`;
				// Insert Title, Salary and Department into Role Array
				db.query(
					query,
					{
						title: answer.roleTitle,
						salary: answer.roleSalary,
						department_id: answer.departmentId,
					},
					function (err, res) {
						if (err) throw err;

						console.log("\n" + res.affectedRows + " role created");
						
						viewRoles();
					},
				);
			});
	});
}


// Update employee role
const updateEmployeeRole = () => {
	// Select Employee to update
	let employees = [];
	db.query(
		`SELECT id, first_name, last_name
  FROM employee`,
		(err, res) => {
			if (err) throw err;

			res.forEach((element) => {
				employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
			// Select employee's new role
			let job = [];
			db.query(`SELECT id, title FROM role`, (err, res) => {
				if (err) throw err;

				res.forEach((element) => {
					job.push(`${element.id} ${element.title}`);
				});

				inquirer.prompt(prompt.updateRole(employees, job)).then((response) => {
					// Update Employee with Chosen Role
					let idCode = parseInt(response.update);
					let roleCode = parseInt(response.role);
				    db.query(
						`UPDATE employee SET role_id = ${roleCode} WHERE id = ${idCode}`,
						(err, res) => {
							if (err) throw err;

							console.log(
								"\n" + "\n" + res.affectedRows + " Updated successfully!",
							);
							
							firstPrompt();
						},
					);
				});
			});
		},
	);
};

// Update manager
const updateEmployeeManager = () => {
	// Select Employee to update
	let employees = [];
	db.query(
		`SELECT id, first_name, last_name
  FROM employee`,
		(err, res) => {
			res.forEach((element) => {
				// for each ID and Name push into array
				employees.push(
					`${element.id} ${element.first_name} ${element.last_name}`,
				);
			});
			// Select employee's new manager
			inquirer.prompt(prompt.updateManager(employees)).then((answer) => {
				// parseInt prompt answers
				let idCode = parseInt(answer.update);
				let managerCode = parseInt(answer.manager);
				db.query(
					// replace employee's mgr_ID with emp_ID of new manager
					`UPDATE employee SET manager_id = ${managerCode} WHERE id = ${idCode}`,
					(err, res) => {
						if (err) throw err;

						console.log(
							"\n" + "\n" + res.affectedRows + " Updated successfully!",
						);
						
						firstPrompt();
					},
				);
			});
		},
	);
};

// Remove employee
function deleteEmployee() {
	console.log("Deleting an employee");

	var query = `SELECT e.id, e.first_name, e.last_name
      FROM employee e`;

	db.query(query, function (err, res) {
		if (err) throw err;
		// Select Employee to remove
		const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
			value: id,
			name: `${id} ${first_name} ${last_name}`,
		}));

		inquirer
			.prompt(prompt.deleteEmployeePrompt(deleteEmployeeChoices))
			.then(function (answer) {
				var query = `DELETE FROM employee WHERE ?`;
				// after prompting, remove item from the db
				db.query(query, { id: answer.employeeId }, function (err, res) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + "  employee deleted");
					
					firstPrompt();
				});
			});
	});
}

// Remove Department
function deleteDepartment() {
	console.log("\nRemove a Department:\n");

	var query = `SELECT e.id, e.name FROM department e`;

	db.query(query, function (err, res) {
		if (err) throw err;
		// Select Department to Remove
		const deleteDepartmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		inquirer
			.prompt(prompt.deleteDepartmentPrompt(deleteDepartmentChoices))
			.then(function (answer) {
				var query = `DELETE FROM department WHERE ?`;
				// after prompting, remove item from the db
				db.query(query, { id: answer.departmentId }, function (
					err,
					res,
				) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + " department deleted");
					
					viewDepartments();
				});
			});
	});
}

// Remove role
function deleteRole() {
	console.log("Deleting a role");

	var query = `SELECT e.id, e.title, e.salary, e.department_id FROM role e`;

	db.query(query, function (err, res) {
		if (err) throw err;
		// Select Role to Remove
		const deleteRoleChoices = res.map(({ id, title }) => ({
			value: id,
			name: `${id} ${title}`,
		}));

		inquirer
			.prompt(prompt.deleteRolePrompt(deleteRoleChoices))
			.then(function (answer) {
				var query = `DELETE FROM role WHERE ?`;
				// after prompting, remove item from the db
				db.query(query, { id: answer.roleId }, function (err, res) {
					if (err) throw err;

					console.log("\n" + res.affectedRows + " role deleted");
					
					viewRoles();
				});
			});
	});
}