INSERT INTO department (name) 
VALUES  ('Executive Management'),
        ('Sales'), 
        ('Service'), 
        ('Finance'), 
        ('Parts'), 
        ('Customer Service');

INSERT INTO role (title, salary, department_id) 
VALUES  ('General Manager', 400000, 1),
        ('Sales Manager', 150000, 2), 
        ('Sales Consultant', 80000, 2), 
        ('Service Manager', 120000, 3), 
        ('Automotive Technician', 75000, 3),
        ('Finance Manager', 130000, 4), 
        ('Accountant', 75000, 4), 
        ('Parts Manager', 90000, 5), 
        ('Parts Specialist', 60000, 5), 
        ('Customer Service Manager', 110000, 6), 
        ('CS Representative', 60000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'Doe', 1, NULL),
        ('Susan', 'Willis', 2, 1), 
        ('Sarah', 'Harrington', 3, 2), 
        ('Mark', 'Ellis', 4, 1), 
        ('Phil', 'Anderson', 5, 4),
        ('Peter', 'Millton', 6, 1), 
        ('Andy', 'Allen', 7, 4), 
        ('Luke', 'Skyrunner', 8, 1), 
        ('Bjorn', 'Longbeard', 9, 8), 
        ('Anthony', 'Hoff', 10, 1), 
        ('Kyle', 'Morrow', 11, 10);
