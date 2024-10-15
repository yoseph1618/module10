INSERT INTO department (name) VALUES ('Engineering'), ('HR'), ('Marketing');

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer', 70000, 1), ('HR Manager', 50000, 2), ('Marketing Specialist', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, NULL), ('Tom', 'Brown', 3, NULL);
