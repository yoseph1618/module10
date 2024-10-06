CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id),
  manager_id INT REFERENCES employees(id) ON DELETE SET NULL
);
