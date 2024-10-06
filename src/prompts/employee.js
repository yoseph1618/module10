import query from '../../dist/connection.js';

export async function viewEmployees() {
  const employees = await query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, 
     employees.manager_id 
     FROM employees 
     JOIN roles ON employees.role_id = roles.id 
     JOIN departments ON roles.department_id = departments.id`,
    []
  );
  console.table(employees);
}

export async function addEmployee(firstName, lastName, roleId, managerId) {
  await query(
    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
  console.log('Employee added successfully.');
}
