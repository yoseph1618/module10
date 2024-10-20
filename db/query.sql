SELECT * FROM department
ORDER BY name ASC;

SELECT r.id, r.title, r.salary, d.name AS department
FROM role r
JOIN department d ON r.department_id = d.id;


SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;


INSERT INTO department (name)
VALUES ('$1');


SELECT * FROM department ORDER BY name ASC
INSERT INTO role (title, salary, department_id)
VALUES ('$1', $2, $3);


SELECT id, title FROM role ORDER BY title ASC
SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name 
FROM employee e
JOIN role r ON e.role_id = r.id
WHERE r.title ILIKE '%Manager%'
ORDER BY name ASC


SELECT id, CONCAT(first_name, ' ', last_name) AS name
FROM employee
ORDER BY name ASC
SELECT id, title FROM role ORDER BY title ASC
UPDATE employee
SET role_id = $2
WHERE id = $1;


SELECT id, CONCAT(first_name, ' ', last_name) AS name 
FROM employee 
ORDER BY name ASC

SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name
FROM employee e
JOIN role r ON e.role_id = r.id
WHERE r.title ILIKE '%Manager%'
ORDER BY name ASC

UPDATE employee 
SET manager_id = $1 
WHERE id = $2


SELECT e.id, CONCAT(r.title, ' - ', e.first_name, ' ', e.last_name) AS name
FROM employee e
JOIN role r ON e.role_id = r.id
WHERE r.title ILIKE '%Manager%'
ORDER BY name ASC

SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE e.manager_id = $1
ORDER BY e.first_name ASC

SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE e.manager_id IS NULL
ORDER BY e.first_name ASC

SELECT id, name FROM department
ORDER BY name ASC

SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.id = $1
ORDER BY e.first_name ASC

DELETE FROM department WHERE id = $1;

DELETE FROM role WHERE id = $1;

DELETE FROM employee WHERE id = $1;



SELECT id, name FROM department
ORDER BY name ASC

SELECT SUM(r.salary) AS total_budget
FROM employee e
JOIN role r ON e.role_id = r.id
WHERE r.department_id = $1