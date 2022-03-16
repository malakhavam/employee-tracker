module.exports = {
		firstOption: {
		type: "list",
		name: "task",
		message: "Make a selection:",
		choices: [
            // View options
			"View Employees",
			"View Employees by Manager", 
			"View Employees by Department", 
			"View Departments", 
			"View Roles", 
			"View Department Budget", 
			// Add options
			"Add Employee", 
			"Add Department", 
			"Add Role", 
			// Update options
			"Update Employee Role", 
			"Update Employee Manager", 
			// Remove options
			"Remove Employee", 
			"Remove Department", 
			"Remove Role", 
			// Quit option
			"Exit",
		],
	},
    viewManagerOption: (managerChoices) => [
		// Select Manager
		{
			type: "list",
			name: "managerId",
			message: "Which manager will you choose?",
			choices: managerChoices,
		},
	],

	// View employees by departments
	departmentOption: (departmentChoices) => [
		// Select Department
		{
			type: "list",
			name: "departmentId",
			message: "Which department do you wnat to see?",
			choices: departmentChoices,
		},
	],

	// Option to add employee
	insertEmployee: (departmentArray, roleArray, managerArray) => [
		// Create Employee's First Name
		{
			name: "firstName",
			type: "input",
			message: "Enter employee's first name:",
		},
		// Create Employee's Last Name
		{
			name: "lastName",
			type: "input",
			message: "Enter employee's last name:",
		},
		// Select Employee's Department
		{
			name: "department",
			type: "list",
			message: "Choose employee's department",
			choices: departmentArray,
		},
		// Select Employee's Role
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: roleArray,
		},
		// Select Employee's Manager
		{
			name: "manager",
			type: "list",
			message: "Choose the manager of this employee:",
			choices: managerArray,
		},
	],

	// Option to add department
	insertDepartment: {
		// Create New Departments Name
		name: "department",
		type: "input",
		message: "What is the name of the new department?",
	},

	// Option to add role
	insertRole: (departmentChoices) => [
		// Create New Role's Name
		{
			type: "input",
			name: "roleTitle",
			message: "Role title?",
		},
		// Create New Role's Salary Budget
		{
			type: "input",
			name: "roleSalary",
			message: "Role Salary",
		},
		// Select New Role's Department
		{
			type: "list",
			name: "departmentId",
			message: "Department?",
			choices: departmentChoices,
		},
	],

		// Option to update role
	updateRole: (employees, job) => [
		// Select Employee to Update
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose role is to be updated:",
			choices: employees,
		},
		// Select Employee's New Role
		{
			name: "role",
			type: "list",
			message: "Choose employee's job position",
			choices: job,
		},
	],

	// Option to update employeer's manager
	updateManager: (employees) => [
		// Select Employee to Update
		{
			name: "update",
			type: "list",
			message: "Choose the employee whose manager is to be updated:",
			choices: employees,
		},
		// Select Employee's New Manager
		{
			name: "manager",
			type: "list",
			message: "Choose employee's new manager",
			choices: employees,
		},
	],

	// Option to delete employee
	deleteEmployeeOption: (deleteEmployeeChoices) => [
		// Select Employee to delete
		{
			type: "list",
			name: "employeeId",
			message: "Which employee do you want to delete?",
			choices: deleteEmployeeChoices,
		},
	],

	// Option to delete department
	deleteDepartmentOption: (deleteDepartmentChoices) => [
		// Select Department to delete
		{
			type: "list",
			name: "departmentId",
			message: "Which department do you want to delete?",
			choices: deleteDepartmentChoices,
		},
	],

	// Option to delete role
	deleteRoleOption: (deleteRoleChoices) => [
		// Select Role to Remove
		{
			type: "list",
			name: "roleId",
			message: "Which role do you want to remove?",
			choices: deleteRoleChoices,
		},
	],	
};