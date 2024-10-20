INSERT INTO department (name) 
VALUES  ('Executive Management'),
        ('Sales'), 
        ('Service'), 
        ('Finance'), 
        ('Customer Service');

INSERT INTO role (title, salary, department_id) 
VALUES  ('General Manager', 80000, 1),
        ('Sales Manager', 20000, 2), 
        ('Service Manager', 35000, 3), 
        ('Accountant', 75000, 4), 
        ('Parts Manager', 90000, 5), 
        ('Customer Service Manager', 110000, 6), 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'Doe', 1, NULL),
        ('Susan', 'Willis', 2, 1), 
        ('Sarah', 'Harrington', 3, 2), 
        ('Phil', 'Anderson', 5, 4),
        ('Peter', 'Millton', 6, 1), 
        ('Andy', 'Allen', 7, 4), 
        ('Luke', 'Skyrunner', 8, 1), 
        ('Bjorn', 'Longbeard', 9, 8), 
