import query from '../../dist/connection.js';

export async function viewEmployees() {
  const employee = await query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
     employee.manager_id 
     FROM employee 
     JOIN role ON employee.role_id = role.id 
     JOIN department ON role.department_id = department.id`,
    []
  );
  console.table(employee);
}

export async function addEmployee(firstName, lastName, roleId, managerId) {
  await query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
  console.log('Employee added successfully.');
}
