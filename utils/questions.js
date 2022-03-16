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

		
};