INSERT INTO department (name) 
VALUES  ('Executive Management'),
        ('Sales'), 
        ('Service'), 
        ('Finance'), 
        ('Customer Service');

INSERT INTO role (title, salary, department_id) 
VALUES  ('General Manager', 90000, 1),
        ('Sales Manager', 20000, 2), 
        ('Service Manager', 35000, 3), 
        ('Accountant', 25000, 4), 
        ('Parts Manager', 40000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'Doe', 1, NULL),
        ('Susan', 'Willis', 2, 1), 
        ('Sarah', 'Harrington', 3, 2), 
        ('Phil', 'Anderson', 4, 4),
        ('Luke', 'Skyrunner', 5, 1);