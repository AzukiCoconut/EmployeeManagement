USE employee_db;
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 100000, 1),
       ("Junior Engineer", 80000, 1),
       ("Accounting Manager", 100000, 2),
       ("Senior Accountant", 90000, 2),
       ("Junior Accountant", 75000, 2),
       ("Senior Lawyer", 110000, 3),
       ("Lawyer", 100000, 3),
       ("Senior Sales Consultant", 85000, 4),
       ("Sales Consultant", 75000, 4),
       ("Junior Sales Consultant", 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fred", "Flintstone", 1, null),
       ("Barney", "Rubble", 2, 1),
       ("Bilbo", "Baggins", 3, null),
       ("Samwise", "Gamji", 4, 3);