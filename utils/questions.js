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

	
};