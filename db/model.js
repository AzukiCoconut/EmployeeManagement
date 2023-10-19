const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    getAllDepartments() {
        return this.connection.promise().query(
            "SELECT id, name FROM department"
        );
    }

    getAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id"
        );
    }

    getAllEmployees() {
        return this.connection.promise().query(
            "SELECT a.id, a.first_name as 'first name', a.last_name as 'last name', c.title, d.name as department, c.salary, CONCAT(b.first_name, ' ', b.last_name) as manager FROM employee as a LEFT JOIN employee as b ON a.manager_id = b.id JOIN role as c ON a.role_id = c.id JOIN department as d ON c.department_id = d.id"
        );
    }

    addDepartment(name) {
        return this.connection.promise().query(
            "INSERT INTO department (name) VALUES (?)", name
        );
    }

    addRole(title, salary, department_id) {
        return this.connection.promise().query(
            "INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [title, salary, department_id]
        );
    }

    addEmployee(firstName, lastName, role_id, manager_id) {
        return this.connection.promise().query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [firstName, lastName, role_id, manager_id]
        );
    }

    getManagers() {
        return this.connection.promise().query(
            "SELECT DISTINCT a.id, CONCAT(a.first_name, ' ', a.last_name) as name FROM employee as a JOIN employee as b ON b.manager_id = a.id"
        );
    }

    getEmployees() {
        return this.connection.promise().query(
            "SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee"
        );
    }

    updateEmployeeRole(id, role_id) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id]
        );
    }

    updateEmployeeManager(id, manager_id) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?", [manager_id, id]
        );
    }

    viewEmployeesByManager() {
        return this.connection.promise().query(
            "SELECT CONCAT(b.first_name, ' ', b.last_name) as manager, a.first_name as 'first name', a.last_name as 'last name' FROM employee as a LEFT JOIN employee as b ON a.manager_id = b.id order by manager desc"
            );
    }

    viewEmployeesByDepartment() {
        return this.connection.promise().query(
            "SELECT d.name as Department, concat(e.first_name, ' ',e.last_name) as name FROM department as d JOIN role as r ON r.department_id = d.id JOIN employee as e ON e.role_id = r.id ORDER BY d.name"
        );
    }

    getRolesByDepartment(dept_id) {
        return this.connection.promise().query(
            "SELECT * FROM role WHERE department_id = ?", dept_id
        );
    }

    deleteDepartment(id) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?", id
        );
    }

    deleteRole(id) {
        return this.connection.promise().query(
            "DELETE FROM role WHERE id = ?", id
        );
    }

    deleteEmployee(id) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?", id
        );
    }
}

module.exports = new DB(connection);