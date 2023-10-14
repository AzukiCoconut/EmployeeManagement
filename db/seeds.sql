USE employee_db;
INSERT INTO department (id, name)
VALUES (1, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (4, "Sales");


INSERT INTO role (id, title, salary, department_id)
VALUES (100, "Senior Engineer", 100000, 1),
       (110, "Junior Engineer", 80000, 1),
       (200, "Accounting Manager", 100000, 2),
       (210, "Senior Accountant", 90000, 2),
       (220, "Junior Accountant", 75000, 2),
       (300, "Senior Lawyer", 110000, 3),
       (310, "Lawyer", 100000, 3),
       (400, "Senior Sales Consultant", 85000, 4),
       (410, "Sales Consultant", 75000, 4),
       (420, "Junior Sales Consultant", 65000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1000, "Fred", "Flintstone", 100, null),
       (1100, "Barney", "Rubble", 110, 1000),
       (2000, "Bilbo", "Baggins", 200, null),
       (2100, "Samwise", "Gamji", 210, 2000);