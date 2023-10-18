const {prompt} = require('inquirer');
const db = require('./db/model');
const logo = require("asciiart-logo");


init();

function init() {
    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update an Employee's manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View Employees by Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },
            ]
        },
    ])
    .then((data) => {
        let choice = data.choice;
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            case "VIEW_EMPLOYEES_BY_DEPT":
                viewEmployeesByDepartment();
                break;
            default:
                quit();
        }
    });    
}


function viewDepartments() {
    db.getAllDepartments().then (([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
    })
    .then (() => loadMainPrompts());
}

function viewRoles() {
    db.getAllRoles().then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => loadMainPrompts());
}

function viewEmployees() {
    db.getAllEmployees().then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
    prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        }
    ])
    .then(res => db.addDepartment(res.departmentName))
    .then(() => console.log("Department added"))
    .then(() => loadMainPrompts());
}

function addRole() {
    prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        }
    ])
    .then (res => {
        let title = res.roleTitle;
        let salary = res.salary;
        db.getAllDepartments().then(([rows]) => {
            let departments = rows;
            const deptChoices = departments.map(({id, name}) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Which department do you want to assign the selected role?",
                    choices: deptChoices
                }
            ])
            .then(res => db.addRole(title, salary, res.departmentId))
            .then(() => console.log("Updated Role"))
            .then(() => loadMainPrompts())
        })
    })
}

function addEmployee() {
    prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input", 
            name: "lastName",
            message: "What is the employee's last name?"
        }
    ])
    .then(res => {
        let firstName = res.firstName;
        let lastName = res.lastName;
        db.getAllRoles().then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({id, title}) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "roleID",
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleChoices
                }
            ])
            .then(res => {
                let role = res.roleID;
                db.getManagers().then(([rows]) => {
                    let managers = rows;
                    const managerChoices = managers.map(({id, name}) => ({
                        name: name,
                        value: id
                    }));
                    managerChoices.push({name: "None", value: null})
                    prompt([
                        {
                            type: "list",
                            name: "managerID",
                            message: "Which what manager do you want to assign?",
                            choices: managerChoices
                        }
                    ])
                    .then(res=> db.addEmployee(firstName, lastName, role, res.managerID))
                    .then(() => console.log("Added employee"))
                    .then(() => loadMainPrompts())
                })
            })
        })
    })
}

function updateEmployeeRole() {
    db.getEmployees().then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({id, name}) => ({
            name: name,
            value: id
        }));
        prompt([
            {
                type: "list",
                name: "employeeID",
                message: "Which employee would you like to add a new role?",
                choices: employeeChoices
            }
        ])
        .then(res => {
            let employeeID = res.employeeID;
            db.getAllRoles().then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({id, title}) => ({
                    name: title,
                    value: id
                }));
                prompt([
                    {
                        type: "list",
                        name: "roleID",
                        message: "Which role would you like to assign?",
                        choices: roleChoices
                    }
                ])
                .then(res => db.updateEmployeeRole(employeeID, res.roleID))
                .then(() => console.log('Employee role updated'))
                .then(() => loadMainPrompts())
            })
        })
    })
    
}

function updateEmployeeManager() {
    db.getEmployees().then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({id, name}) => ({
            name: name, 
            value: id
        }));
        prompt([
            {
                type: "list",
                name: "employeeID",
                message: "Which employee would you like to add a manager to?",
                choices: employeeChoices
            }
        ])
        .then(res => {
            let employeeID = res.employeeID;
            db.getManagers().then(([rows]) => {
                let managers = rows;
                const managerChoices = managers.map(({id, name}) => ({
                    name: name,
                    value: id
                }));
                prompt([
                    {
                        type: "list",
                        name: "managerID",
                        message: "Which manager would you like to assign?",
                        choices: managerChoices
                    }
                ])
                .then(res => db.updateEmployeeManager(employeeID, res.managerID))
                .then(() => console.log('Employee manager updated'))
                .then(() => loadMainPrompts())
            })
        })
    })
}

function viewEmployeesByManager() {
    db.viewEmployeesByManager().then (([rows]) => {
        let list = rows;
        console.log("\n");
        console.table(list);
    })
    .then (() => loadMainPrompts());
}

function viewEmployeesByDepartment() {
    db.viewEmployeesByDepartment().then(([rows]) => {
        let list = rows;
        console.log("\n");
        console.table(list);
    })
    .then (() => loadMainPrompts());
}


function quit() {
    process.exit(0);
}